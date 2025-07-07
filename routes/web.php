<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('beranda');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('menu',MenuController::class)->middleware(['auth', 'verified'])->name('menu');

Route::get('fitur',function(){
    return Inertia::render('fitur');
})->middleware(['auth', 'verified'])->name('fitur');

Route::get('aplikasi',function(){
    return Inertia::render('aplikasi');
})->middleware(['auth', 'verified'])->name('aplikasi');

Route::get('db-siswa',function(){
    $data =  Auth::user()->dataprofil2();
    // dd($data->dataprofil2());
    return Inertia::render('dbsiswa');
})->middleware(['auth', 'verified'])->name('dbsiswa');

require __DIR__. '/approval.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
