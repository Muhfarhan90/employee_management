<?php

namespace Database\Seeders;

use App\Models\EmpSalary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmpSalarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmpSalary::factory()->count(10)->create();

    }
}
