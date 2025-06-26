<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmpPresence extends Model
{
    use HasFactory;

    protected $table = 'emp_presences';

    protected $fillable = [
        'employee_id',
        'check_in',
        'check_out',
        'late_in',
        'early_out',
    ];

    protected static function newFactory()
    {
        return \Database\Factories\EmpPresenceFactory::new();
    }
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
