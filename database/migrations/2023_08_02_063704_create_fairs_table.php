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
        Schema::create('fairs', function (Blueprint $table) {
            $table->id();
            $table->string('regular');
            $table->string('student');
            $table->string('minor');
            $table->string('pwd');
            $table->string('senior');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fairs');
    }
};