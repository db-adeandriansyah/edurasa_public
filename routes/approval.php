<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Ptk\PtkController;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\DataAkunController;
use App\Http\Controllers\Ptk\PtkApiController;
use App\Http\Controllers\ApprovalApiController;
use App\Http\Controllers\DataAkunApiController;

Route::middleware(['auth','role:admin'])->group(function(){
    /**route ini untuk 'super admin'
     * tapi untuk sementara hanya bisa diakses oleh admin
    */
    // Route::middleware(['role:admin'])->group(function(){

    // });
    Route::middleware(['khusus_ajax'])->group(function(){
        Route::get('approval-api',[ApprovalApiController::class,'index'])->name('approval-api');
        Route::get('daftar-akun-api',[DataAkunApiController::class,'index'])->name('dataakunapi');
        Route::get('ptk-tiap-sekolah-api',[PtkApiController::class,'index'])->name('ptk-api');
    });

    //route ini untuk mendeteksi user baru yang perlu diapproval
    // Route::get('approval',[ApprovalController::class,'indexcari'])->name('approval-search')->where('page','.*');
    Route::get('approval',ApprovalController::class)->name('approval');


    //ruote ini untuk melihat data user, baik ptk/siswa, termasuk data sekolahnya
    Route::get('daftar-akun', DataAkunController::class)->name('daftar-akun');

    Route::get('ptk-tiap-sekolah',PtkController::class)->name('ptk');
    
});