<?php

namespace Database\Seeders;

use App\Models\Ptk;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\PtkSeeder;
use Database\Seeders\RolePermisionSeeder;
use Database\Seeders\SiswaSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->call(RolePermisionSeeder::class );
        $this->call(SchoolSeeder::class);

      
    }
}
