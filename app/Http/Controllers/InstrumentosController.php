<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;

class InstrumentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(?string $instrumento = ""): Response
    {
        return Inertia::render('Instrumentos');
    }
}
