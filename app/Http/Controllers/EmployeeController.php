<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $employees = Employee::paginate($perPage);

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employee/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'address' => 'required|string',
            'phone' => 'required|string|max:25',
            'user_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'password' => 'required|string|min:8',
        ]);

        $data = $request->only('name', 'email', 'address', 'phone');

        // Hash password
        $data['password'] = Hash::make($request->password);

        // Upload file
        if ($request->hasFile('user_picture')) {
            $path = $request->file('user_picture')->store('user_pictures', 'public');
            $data['user_picture'] = $path;
        }

        Employee::create($data);

        return redirect()->route('employee.index')->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return Inertia::render('Employee/Show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('Employee/Edit', [
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:employees,email,{$employee->id}",
            'address' => 'required|string',
            'phone' => 'required|string|max:25',
            'user_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'password' => 'nullable|string|min:8',
        ]);

        $data = $request->only('name', 'email', 'address', 'phone');

        // If password is filled
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        // If new picture uploaded, delete old one
        if ($request->hasFile('user_picture')) {
            if ($employee->user_picture) {
                Storage::disk('public')->delete($employee->user_picture);
            }
            $path = $request->file('user_picture')->store('user_pictures', 'public');
            $data['user_picture'] = $path;
        }
        $employee->update($data);

        return redirect()->route('employee.index')->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        if ($employee->user_picture) {
            Storage::disk('public')->delete($employee->user_picture);
        }
        $employee->delete();

        return redirect()->route('employee.index')->with('success', 'Employee deleted successfully.');
    }
}
