<?php

namespace App\Http\Controllers;

use App\Models\EmpPresence;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmpPresenceController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $presences = EmpPresence::with('employee')->orderBy('check_in', 'DESC')->paginate($perPage);
        return Inertia::render('EmployeePresence/Index', [
            'presences' => $presences,
        ]);
    }

    public function create()
    {
        $employees = Employee::all();
        return Inertia::render('EmployeePresence/Create', [
            'employees' => $employees,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'check_in' => 'required|date',
        ]);

        $jamKerjaMasuk = '08:00:00';
        $checkIn = new \DateTime($request->check_in);
        $jamMasuk = new \DateTime($checkIn->format('Y-m-d') . ' ' . $jamKerjaMasuk);

        // Hitung selisih dalam menit
        $diff = ($checkIn->getTimestamp() - $jamMasuk->getTimestamp()) / 60;
        $late_in = (int)($diff * (-60));

        EmpPresence::create([
            'employee_id' => $request->employee_id,
            'check_in' => $request->check_in,
            'late_in' => $late_in,
        ]);

        return redirect()->route('employee-presence.index')->with('success', 'Check-in berhasil.');
    }

    public function edit(EmpPresence $employee_presence)
    {
        $employees = Employee::all();
        return Inertia::render('EmployeePresence/Edit', [
            'employee_presence' => $employee_presence,
            'employees' => $employees,
        ]);
    }

    public function update(Request $request, EmpPresence $employee_presence)
    {
        $request->validate([
            'check_out' => 'required|date',
        ]);

        $jamKerjaPulang = '17:00:00';
        $checkOut = new \DateTime($request->check_out);
        $jamPulang = new \DateTime($checkOut->format('Y-m-d') . ' ' . $jamKerjaPulang);

        // Hitung selisih dalam menit
        $diff = ($checkOut->getTimestamp() - $jamPulang->getTimestamp()) / 60;
        $early_out = 0;
        if ($diff < 0) {
            $early_out = (int)($diff * 60); // dalam detik
        }

        $employee_presence->update([
            'check_out' => $request->check_out,
            'early_out' => $early_out,
        ]);

        return redirect()->route('employee-presence.index')->with('success', 'Check-out berhasil.');
    }

    public function destroy(EmpPresence $employee_presence)
    {
        $employee_presence->delete();
        return redirect()->route('employee-presence.index')->with('success', 'Presence deleted.');
    }
}
