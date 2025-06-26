<?php

namespace Database\Seeders;

use App\Models\EmpPresence;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmpPresenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmpPresence::factory()->count(10)->create();
    }
}
