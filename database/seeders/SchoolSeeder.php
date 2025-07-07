<?php

namespace Database\Seeders;

use App\Models\Ptk;
use App\Models\School;
use App\Models\Siswa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        School::factory()
            ->count(5)
            ->hasAttached(Ptk::factory()->count(15)->hasAkunForRolesGK(),fn()=>[
                'start_at' => fake()->dateTimeBetween('-5 years','now'),
                'end_at' =>null
            ])
            ->hasAttached(Ptk::factory()->count(15)->hasAkunForRolesGMP(),fn()=>[
                'start_at' => fake()->dateTimeBetween('-5 years','now'),
                'end_at' =>null
            ])
            
            ->hasAttached(Siswa::factory()->count(25),fn()=>[
                'nis' => fake()->unique()->numerify('2025####'),
                'start_at'=> fake()->dateTimeBetween('-4 years','now')
            ])
            ->hasAttached(Siswa::factory()->count(5)->hasAkun(),fn()=>[
                'nis' => fake()->unique()->numerify('2025####'),
                'start_at'=> fake()->dateTimeBetween('-4 years','now')
            ])
            // ->hasAttached(Siswa::factory()->count(5)->hasAkun())
            // ->for(Siswa::factory()->count(35)->hasAkun()->create(),'daftarSiswaDiSekolah')
            ->create();
    }
}
