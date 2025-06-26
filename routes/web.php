<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmpPresenceController;
use App\Http\Controllers\EmpSalaryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/employee', EmployeeController::class);
    Route::resource('/employee-presence', EmpPresenceController::class);
    Route::resource('/employee-salary', EmpSalaryController::class);
    Route::get('/employee-salary-calculate', [EmpSalaryController::class, 'calculate'])->name('employee-salary.calculate');
});

require __DIR__.'/auth.php';
