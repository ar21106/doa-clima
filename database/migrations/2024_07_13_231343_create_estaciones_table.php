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
        Schema::create('estaciones', function (Blueprint $table) {
            $table->string('indice')->primary();
            $table->string('nombre');
            $table->string('descripcion');
            $table->string('direccion');
            $table->double('latitud');
            $table->double('longitud');
        });

        Schema::create('fotos', function (Blueprint $table) {
            $table->id('');
            $table->string('indice');
            $table->foreign('indice')->references('indice')->on('estaciones')->restrictOnDelete();
            $table->string('name')->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estaciones');
        Schema::dropIfExists('fotos');
    }
};
