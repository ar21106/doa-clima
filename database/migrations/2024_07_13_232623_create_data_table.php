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
            $table->foreign('indice')->references('indice')->on('estaciones');
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

            $table->double('ftea')->nullable();

            $table->time('ftee')->nullable();
            $table->time('fgra')->nullable();
            $table->time('fchu')->nullable();

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

            $table->integer('es07')->nullable();
            $table->integer('es14')->nullable();
            $table->integer('es21')->nullable();

            $table->integer('er07')->nullable();
            $table->integer('er21')->nullable();

            $table->string('codcaptura');
            $table->double('tosc')->nullable();
            $table->integer('erd')->nullable();
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
