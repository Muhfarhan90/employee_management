<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emp_salary extends Model
{
    use HasFactory;

    protected $table = 'emp_salaries';

    protected $fillable = [
        'employee_id',
        'month',
        'year',
        'basic_salary',
        'bonus',
        'bpjs',
        'jp',
        'loan',
        'total_salary',
    ];
}
