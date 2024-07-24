<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(?string $variable = "Temperatura"): Response
    {
        $columnas = [];

        switch ($variable) {
            case 'Temperatura':
                $columnas = ['fecha', 'tmax', 'tmin', 'ts07', 'ts14', 'ts21', 'ts'];
                break;

            case 'Temperatura Humeda':
                $columnas = ['fecha', 'th07', 'th14', 'th21', 'th'];
                break;

            case 'Humedad relativa':
                $columnas = ['fecha', 'hr07', 'hr14', 'hr21', 'hr'];
                break;

            case 'Presión de vapor':
                $columnas = ['fecha', 'pvp07', 'pvp14', 'pvp21', 'pvp'];
                break;

            case 'Precipitación':
                $columnas = ['fecha', 'p07', 'p14', 'p21', 'pd'];
                break;

            case 'Fenómenos':
                $columnas = ['fecha', 'fray', 'ftea', 'ftee', 'fgra', 'fchu'];
                break;

            case 'Velocidad del viento':
                $columnas = ['fecha', 'sa07', 'sa14', 'sa21', 'sa'];
                break;

            case 'Dirección del viento':
                $columnas = ['fecha', 'rd07', 'rd14', 'rd21', 'rd'];
                break;

            case 'Nubosidad':
                $columnas = ['fecha', 'nub07', 'nub14', 'nub21', 'nub'];
                break;

            case 'Visibilidad':
                $columnas = ['fecha', 'vis07', 'vis14', 'vis21'];
                break;

            case 'Estado del suelo':
                $columnas = ['fecha', 'es07', 'es14', 'es21'];
                break;

            case 'Estado del rocio':
                $columnas = ['fecha', 'er07', 'er21', 'erd'];
                break;

            default:
                $variable = "Temperatura";
                $columnas = ['fecha', 'tmax', 'tmin', 'ts07', 'ts14', 'ts21', 'ts'];
                break;
        }

        $estaciones = DB::table('estaciones')->orderBy('indice')->get();
        $datos = DB::table('data')->where('indice', 'A-31')->whereBetween('fecha', ['2020-01-01', '2021-12-31'])->orderBy('fecha', 'desc')->get($columnas);
        $estacionElegida = DB::table('estaciones')->where('indice', 'A-31')->first();

        return Inertia::render('Datos', [
            'estaciones' => $estaciones,
            'datos' => $datos,
            'estacion' => $estacionElegida,
            'variable' => $variable
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function filtro(Request $request): Response
    {
        $desde = $request->input('fechaDesde');
        $hasta = $request->input('fechaHasta');
        $variable = $request->input('variable');
        $estacion = $request->input('estacion');
        $orden = $request->input('orden');

        $columnas = [];

        switch ($variable) {
            case 'Temperatura':
                $columnas = ['fecha', 'tmax', 'tmin', 'ts07', 'ts14', 'ts21', 'ts'];
                break;

            case 'Temperatura Humeda':
                $columnas = ['fecha', 'th07', 'th14', 'th21', 'th'];
                break;

            case 'Humedad relativa':
                $columnas = ['fecha', 'hr07', 'hr14', 'hr21', 'hr'];
                break;

            case 'Presión de vapor':
                $columnas = ['fecha', 'pvp07', 'pvp14', 'pvp21', 'pvp'];
                break;

            case 'Precipitación':
                $columnas = ['fecha', 'p07', 'p14', 'p21', 'pd'];
                break;

            case 'Fenómenos':
                $columnas = ['fecha', 'fray', 'ftea', 'ftee', 'fgra', 'fchu'];
                break;

            case 'Velocidad del viento':
                $columnas = ['fecha', 'sa07', 'sa14', 'sa21', 'sa'];
                break;

            case 'Dirección del viento':
                $columnas = ['fecha', 'rd07', 'rd14', 'rd21', 'rd'];
                break;

            case 'Nubosidad':
                $columnas = ['fecha', 'nub07', 'nub14', 'nub21', 'nub'];
                break;

            case 'Visibilidad':
                $columnas = ['fecha', 'vis07', 'vis14', 'vis21'];
                break;

            case 'Estado del suelo':
                $columnas = ['fecha', 'es07', 'es14', 'es21'];
                break;

            case 'Estado del rocio':
                $columnas = ['fecha', 'er07', 'er21', 'erd'];
                break;

            default:
                # code...
                break;
        }

        $estaciones = DB::table('estaciones')->orderBy('indice')->get();
        $datos = DB::table('data')->where('indice', $estacion)->whereBetween('fecha', [$desde, $hasta])->orderBy('fecha', $orden)->get($columnas);
        $estacionElegida = DB::table('estaciones')->where('indice', $estacion)->first();

        return Inertia::render('Datos', [
            'estaciones' => $estaciones,
            'datos' => $datos,
            'estacion' => $estacionElegida,
            'variable' => $variable
        ]);
    }
}
