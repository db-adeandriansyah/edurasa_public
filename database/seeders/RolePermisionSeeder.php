<?php

namespace Database\Seeders;

use App\Models\Permission ;//as ModelsPermission;
use App\Models\Role;
use App\Models\User;
use App\Peran;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// use Spatie\Permission\Models\Permission;

class RolePermisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $s_a = app(Role::class)->findOrCreate(Peran::SUPER_ADMIN->value, 'web');
        $a = app(Role::class)->findOrCreate(Peran::ADMIN->value, 'web');
        $g_k = app(Role::class)->findOrCreate(Peran::GURU_KELAS->value, 'web');
        $g_mp = app(Role::class)->findOrCreate(Peran::GURU_MAPEL->value, 'web');
        $ops = app(Role::class)->findOrCreate(Peran::OPS->value, 'web');

        Permission::create(['name' => 'view Approval']);
        Permission::create(['name' => 'view Data Siswa']);
        Permission::create(['name' => 'view Absensi Siswa']);
        Permission::create(['name' => 'view KBM']);

        $a->givePermissionTo(['view Approval', 'view Data Siswa', 'view Absensi Siswa', 'view KBM']);
        $g_k->givePermissionTo(['view Data Siswa', 'view Absensi Siswa', 'view KBM']);

        $user_gk = User::create([
            'name' => 'User Guru',
            'email' => 'gurukelas@example.com',
            'password' => Hash::make('password'),
        ]);
        $user_admin = User::create([
            'name' => 'User Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        $user_gk->assignRole($g_k);
        $user_admin->assignRole($a);

    }
}
