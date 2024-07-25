<?php

use App\Http\Controllers\EstacionController;
use App\Http\Controllers\InstrumentosController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DataController;
use Illuminate\Support\Facades\Route;

Route::get('/', function(){
    return redirect('mapa');
});

Route::get('mapa/{indice?}', [EstacionController::class, 'index']
)->name('dashboard');

Route::get('datos/{estacion?}/{variable?}', [DataController::class,'index'])
->name('datos');

Route::post('datos', [DataController::class,'filtro'])
->name('filtro');

Route::get('instrumentos/{instrumento?}', [InstrumentosController::class, 'index'])
->name('instrumentos');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
