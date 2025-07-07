<?php

namespace App\Interfaces;

use Illuminate\Contracts\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Builder;

interface UserInterface
{
    /**
     * Interface ini digunakan untuk mengambil data di tabel user 
     * secara kolektif. Maksudnya tidak mengambil data untuk user yang telah login;
     * Tujuan dar interface:
     * 1. Untuk mengambil data user secara kolektif
     * 2. Untuk mengambil data user yang memiliki relasi dengan profile
     * 3. Untuk mengambil data user yang memiliki relasi dengan profile.profilable
     * 4. Untuk mengambil data user yang memiliki relasi dengan profile.profilable.schools
     * 
     */

     //sediakan property agar bisa dichaing

    


    //method untuk mendapatkan data user
    public function getUserData():Builder;

    //method untuk mendapatkan data ptk
    public function getPtkData();  
    
    public function paginateWithSearch(int $perPage, int $page, ?string $search);



}
