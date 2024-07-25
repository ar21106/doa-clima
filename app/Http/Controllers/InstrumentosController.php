<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class InstrumentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(?string $estacion = "A-31", ?string $instrumento = ""): Response
    {
        $estacionElegida = DB::table('estaciones')->where('indice', $estacion)->first();
        $instrumentos = [
            "Garita meteorológica 1",
            "Garita meteorológica 2",
            "Heliógrafo 1",
            "Heliógrafo 2",
            "Heliógrafo 3",
            "Heliógrafo 4",
            "Termógrafo"
        ];

        return Inertia::render('Instrumentos', [
            'estacion' => $estacionElegida,
            'instrumento' => $instrumento,
            'instrumentos' => $instrumentos

        ]);
    }
}
