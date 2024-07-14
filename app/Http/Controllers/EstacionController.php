<?php

namespace App\Http\Controllers;

use App\Models\Estacion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class EstacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $estaciones = DB::table('estaciones')->get();

        return Inertia::render('Dashboard', [
            'estaciones' => $estaciones
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