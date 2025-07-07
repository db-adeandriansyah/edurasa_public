<?php

namespace Database\Seeders;

use App\Models\Ptk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PtkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ptk::factory()
        ->count(25)
        ->create();
        //BUAT PTK GK SEBANYAK 5
        Ptk::factory()
        ->count(21)
        ->hasAkunForRolesGK()
        ->create();
        //BUAT PTK GMP SEBANYAK 5
        Ptk::factory()
        ->count(4)
        ->hasAkunForRolesGMP()
        ->create();
    }
}
