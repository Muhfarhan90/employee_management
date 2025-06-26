<?php

namespace App\Http\Controllers;

use App\Models\EmpSalary;
use App\Models\Employee;
use App\Models\EmpPresence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EmpSalaryController extends Controller
{
    public function index(Request $request)
    {
        $query = EmpSalary::with('employee');
        // Optional: filter by month/year
        if ($request->month !== null) {
            $query->where('month', $request->month);
        }
        if ($request->year !== null) {
            $query->where('year', $request->year);
        }

        $salaries = $query->orderBy('year', 'DESC')->orderBy('month', 'DESC')->paginate(10);

        return Inertia::render('EmployeeSalary/Index', [
            'salaries' => $salaries,
            'filters' => [
                'month' => $request->month,
                'year' => $request->year,
            ],
        ]);
    }

    public function create()
    {
        $employees = Employee::all();
        return Inertia::render('EmployeeSalary/Create', [
            'employees' => $employees,
            'months' => range(1, 12),
            'years' => range(date('Y') - 2, date('Y') + 2),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000',
            'basic_salary' => 'required|numeric',
            'bonus' => 'nullable|numeric',
            'bpjs' => 'nullable|numeric',
            'jp' => 'nullable|numeric',
            'loan' => 'nullable|numeric',
            'total_salary' => 'nullable|numeric',
        ]);

        EmpSalary::create($request->all());

        return redirect()->route('employee-salary.index')->with('success', 'Salary created.');
    }

    public function edit(EmpSalary $employee_salary)
    {
        $employees = Employee::all();
        return Inertia::render('EmployeeSalary/Edit', [
            'employee_salary' => $employee_salary,
            'employees' => $employees,
            'months' => range(1, 12),
            'years' => range(date('Y') - 2, date('Y') + 2),
        ]);
    }

    public function update(Request $request, EmpSalary $employee_salary)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000',
            'basic_salary' => 'required|numeric',
            'bonus' => 'nullable|numeric',
            'bpjs' => 'nullable|numeric',
            'jp' => 'nullable|numeric',
            'loan' => 'nullable|numeric',
            'total_salary' => 'nullable|numeric',
        ]);

        $employee_salary->update($request->all());

        return redirect()->route('employee-salary.index')->with('success', 'Salary updated.');
    }

    public function destroy(EmpSalary $employee_salary)
    {
        $employee_salary->delete();
        return redirect()->route('employee-salary.index')->with('success', 'Salary deleted.');
    }

    public function calculate(Request $request)
    {
        $month = $request->month ?? date('n');
        $year = $request->year ?? date('Y');
        $salaries = DB::table('employees')
            ->leftJoin('emp_presences', 'employees.id', '=', 'emp_presences.employee_id')
            ->leftJoin('emp_salaries', function ($join) use ($month, $year) {
                $join->on('employees.id', '=', 'emp_salaries.employee_id')
                    ->where('emp_salaries.month', '=', $month)
                    ->where('emp_salaries.year', '=', $year);
            })
            ->select(
                'employees.id',
                'employees.name as employee_name',
                'emp_salaries.basic_salary as basic_salary',
                DB::raw('SUM(IF((emp_presences.late_in/60) > 5, (emp_presences.late_in/60)-5, 0)) as total_late_min'),
                DB::raw('SUM(emp_presences.early_out/60) as total_early_min')
            )
            ->whereMonth('emp_presences.check_in', $month)
            ->whereYear('emp_presences.check_in', $year)
            ->groupBy(
                'employees.id',
                'employees.name',
                'emp_salaries.basic_salary'
            )
            ->get();

        $finalSalaries = $salaries->map(function ($row) use ($month, $year) {
            $basic_salary = $row->basic_salary;
            $late_penalty = $row->total_late_min * 5000;
            $early_penalty = $row->total_early_min * 5000;
            $bonus = - ($late_penalty + $early_penalty);
            $bpjs = 0.02 * $basic_salary;
            $jp = 0.01 * $basic_salary;
            $loan = $row->loan ?? 0;
            $total_salary = $basic_salary + $bonus - ($bpjs + $jp + $loan);

            return [
                'month' => $month,
                'year' => $year,
                'employee_name' => $row->employee_name,
                'basic_salary' => $basic_salary,
                'bonus' => $bonus,
                'bpjs' => $bpjs,
                'jp' => $jp,
                'loan' => $loan,
                'total_salary' => $total_salary,
            ];
        });
        return Inertia::render('EmployeeSalary/Calculate/Index', [
            'salaries' => $finalSalaries,
            'defaultMonth' => $month,
            'defaultYear' => $year,
        ]);
    }
}
