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
        Schema::create('data', function (Blueprint $table) {
            $table->string('codigo')->primary();
            $table->string('indice');
            $table->foreign('indice')->references('indice')->on('estaciones')->restrictOnDelete();
            $table->date('fecha');

            $table->double('tmax')->nullable();
            $table->double('tmin')->nullable();

            $table->double('ts07')->nullable();
            $table->double('ts14')->nullable();
            $table->double('ts21')->nullable();
            $table->double('ts')->nullable();

            $table->double('th07')->nullable();
            $table->double('th14')->nullable();
            $table->double('th21')->nullable();
            $table->double('th')->nullable();

            $table->decimal('pvp07', places:6)->nullable();
            $table->decimal('pvp14', places:6)->nullable();
            $table->decimal('pvp21', places:6)->nullable();
            $table->decimal('pvp', places:6)->nullable();

            $table->integer('hr07')->nullable();
            $table->integer('hr14')->nullable();
            $table->integer('hr21')->nullable();
            $table->integer('hr')->nullable();

            $table->double('p07')->nullable();
            $table->double('p14')->nullable();
            $table->double('p21')->nullable();
            $table->double('pd')->nullable();

            $table->time('fray')->nullable();
            $table->time('ftea')->nullable();
            $table->time('ftee')->nullable();
            $table->time('fgra')->nullable();
            $table->time('fchu')->nullable();

            $table->string('prn07')->nullable();
            $table->string('prn14')->nullable();
            $table->string('prn21')->nullable();
            $table->string('prn')->nullable();

            $table->string('rd07')->nullable();
            $table->string('rd14')->nullable();
            $table->string('rd21')->nullable();
            $table->string('rd')->nullable();

            $table->integer('sa07')->nullable();
            $table->integer('sa14')->nullable();
            $table->integer('sa21')->nullable();
            $table->double('sa')->nullable();

            $table->integer('nub07')->nullable();
            $table->integer('nub14')->nullable();
            $table->integer('nub21')->nullable();
            $table->double('nub')->nullable();

            $table->double('vis07')->nullable();
            $table->double('vis14')->nullable();
            $table->double('vis21')->nullable();

            $table->string('es07')->nullable();
            $table->string('es14')->nullable();
            $table->string('es21')->nullable();
            $table->string('er07')->nullable();
            $table->string('er21')->nullable();

            $table->string('pa07')->nullable();
            $table->string('pa14')->nullable();
            $table->string('pa21')->nullable();
            $table->string('pa')->nullable();

            $table->string('evap')->nullable();

            $table->string('ls07')->nullable();
            $table->string('ls08')->nullable();
            $table->string('ls09')->nullable();
            $table->string('ls10')->nullable();
            $table->string('ls11')->nullable();

            $table->string('ls12')->nullable();
            $table->string('ls13')->nullable();
            $table->string('ls14')->nullable();
            $table->string('ls15')->nullable();
            $table->string('ls16')->nullable();

            $table->string('ls17')->nullable();
            $table->string('ls18')->nullable();
            $table->string('lsm')->nullable();
            $table->string('lst')->nullable();
            $table->string('ls')->nullable();

            $table->string('codcaptura');
            $table->double('tosc')->nullable();
            $table->string('erd')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data');
    }
};
