<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmpSalary>
 */
class EmpSalaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id'  => Employee::inRandomOrder()->value('id'),
            'month'        => fake()->numberBetween(1, 12),
            'year'         => fake()->numberBetween(2024, 2025),
            'basic_salary' => fake()->numberBetween(3_000_000, 5_000_000),
            'bonus'        => fake()->numberBetween(100_000, 500_000),
            'bpjs'         => fake()->numberBetween(50_000, 100_000),
            'jp'           => fake()->numberBetween(50_000, 100_000),
            'loan'         => fake()->numberBetween(0, 1_000_000),
            'total_salary' => fake()->numberBetween(3_500_000, 6_000_000),
        ];
    }
}
