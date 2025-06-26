<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('emp_salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->references('id')->on('employees')->onDelete('cascade');
            $table->integer('month')->nullable();
            $table->integer('year')->nullable();
            $table->double('basic_salary')->nullable();
            $table->double('bonus')->nullable();
            $table->double('bpjs')->nullable();
            $table->double('jp')->nullable();
            $table->double('loan')->nullable();
            $table->double('total_salary')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emp_salary');
    }
};
