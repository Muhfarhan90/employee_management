<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmpPresence>
 */

class EmpPresenceFactory extends Factory
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
            'check_in' => fake()->dateTime(),
            'check_out' => fake()->dateTime(),
            'late_in' => fake()->numberBetween(0, 120),
            'early_out' => fake()->numberBetween(0, 120),
        ];
    }
}
