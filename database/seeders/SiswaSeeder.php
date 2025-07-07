<?php

namespace Database\Seeders;

use App\Models\Siswa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Siswa::factory()
        ->count(9)
        ->hasAkun()
        ->create();
        //buat 90 siswa tanpa akun
        Siswa::factory()
        ->count(90)
        ->create();
       
    }
}
