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
        Schema::create('refund_rebooks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('passenger_id')->constrained()->onDelete('cascade');
            $table->foreignId('manifest_dates_id')->constrained()->onDelete('cascade');
            $table->string('date')->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refund_rebooks');
    }
};
