<?php

namespace App\Http\Controllers;

use App\Models\Estacion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EstacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $estacion = (object)[
            'nombre' => 'estacion de ejemplo',
            'descripcion' => 'esta es una estacion de ejemplo',
            'tipo' => 'pluvial',
            'latitud' => 13.7101,
            'longitud' => -89.2035
        ];

        return Inertia::render('Dashboard', [
            'estacion' => $estacion
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Estacion $estacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estacion $estacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estacion $estacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estacion $estacion)
    {
        //
    }
}
