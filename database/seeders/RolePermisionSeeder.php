<?php

namespace Database\Seeders;

use App\Models\Permission ;//as ModelsPermission;
use App\Models\Profilable;
use App\Models\Ptk;
use App\Models\Role;
use App\Models\User;
use App\Enums\Peran;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder as Seeder;
use Illuminate\Support\Facades\Hash;

// use Spatie\Permission\Models\Permission;

class RolePermisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $s_a = app(Role::class)->findOrCreate(Peran::SUPER_ADMIN->value, 'web');
        $a = app(Role::class)->findOrCreate(Peran::ADMIN->value, 'web');
        $g_k = app(Role::class)->findOrCreate(Peran::GURU_KELAS->value, 'web');
        $g_mp = app(Role::class)->findOrCreate(Peran::GURU_MAPEL->value, 'web');
        $ops = app(Role::class)->findOrCreate(Peran::OPS->value, 'web');
        $siswa = app(Role::class)->findOrCreate(Peran::SISWA->value, 'web');

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
        $user_admin =User::create([
            'name' => 'User Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        $user_gk->assignRole($g_k);
        $user_admin->assignRole($a);
        
        
        $user_ptk_berakun = User::create([
            'name' => 'User Has Profil',
            'email' => 'userhasprofile@example.com',
            'password' => Hash::make('password'),
        ]);
        
        //tambahkan peran
        $user_ptk_berakun->assignRole($g_k);

        //masukkan ke data Ptk ;
        $id_ptk = Ptk::insertGetId([
            'name'=>$user_ptk_berakun->name,
            'nip' =>'19991212 201304 1 002',
            'nuptk' => '1122333444555667'
        ]);
        //masukkan ke polymorphic
        Profilable::create([
            'user_id' => $user_ptk_berakun->id,
            'profilable_type' => Ptk::class,
            'profilable_id' =>$id_ptk,
            'peran' => Peran::GURU_KELAS->value
        ]);

    }
}
