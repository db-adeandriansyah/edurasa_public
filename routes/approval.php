<?php

use App\Models\Ptk;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\School;
use App\Models\Pegawaisekolah;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\ApprovalApiController;

Route::middleware(['auth','role:admin','khusus_ajax'])->group(function(){
    /**route ini untuk 'super admin'
     * tapi untuk sementara hanya bisa diakses oleh admin
    */
    // Route::middleware(['role:admin'])->group(function(){

    // });

    //route ini untuk mendeteksi user baru yang perlu diapproval
    // Route::get('approval',[ApprovalController::class,'indexcari'])->name('approval-search')->where('page','.*');
    Route::get('approval',[ApprovalController::class,'index'])->name('approval')->withoutMiddleware('khusus_ajax');
    Route::get('approval-api',[ApprovalApiController::class,'index'])->name('approval-api');

    //ruote ini untuk melihat data user, baik ptk/siswa, termasuk data sekolahnya
    Route::get('approval-akun', function(){
        $ptk = Ptk::with(['profile.user'])->get()->toArray();
        $user = User::with(['profile.profilable','roles'])->get()->toArray();
        

        return Inertia::render('approval/data-approval',[
            'ptk' => $ptk,
            'user' => $user
        ]);
    })->name('approval-user');

    // Route::get('ptk-tiap-sekolah', function(){
    //     $data_sekolah_ptk = School::with(['ptks.profile.user'])->get()->toArray();
    //     // $data_ptk = Ptk::with(['riwayatPegawaiSekolah'])->get()->toArray();
    //     $data_ptk = Ptk::whereHas('riwayatPegawaiSekolah')->with(['riwayatPegawaiSekolah'])->get()->toArray();
        
        

    //     return Inertia::render('approval-ptk-sekolah',[
    //         'data_sekolah' => $data_sekolah_ptk,
    //         'data_ptk_sekolah' => $data_ptk,
            
    //     ]);
    // })->name('approval-ptk-sekolah');

    // Route::get('siswa-tiap-sekolah', function(){
    //     $data_sekolah_ptk = School::withCount(['siswas'])->get()->toArray();
    //     // $data_ptk = Ptk::with(['riwayatPegawaiSekolah'])->get()->toArray();
    //     $data_ptk = Siswa::with(['riwayatsekolahsiswa','profile.user'])->get()->toArray();
    //     $data_ptk_akun = Siswa::whereHas('profile')->with(['riwayatsekolahsiswa'])->get()->toArray();
        
        

    //     return Inertia::render('approval-siswa-sekolah',[
    //         'data_sekolah' => $data_sekolah_ptk,
    //         'data_ptk_sekolah' => $data_ptk,
    //         'data_ptk_akun' => $data_ptk_akun,
            
    //     ]);
    // })->name('approval-ptk-sekolah');
    
});