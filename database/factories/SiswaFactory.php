<?php

namespace Database\Factories;

use App\Enums\ApprovalEnum;
use App\Models\Profilable;
use App\Models\School;
use App\Models\Sekolahsiswa;
use App\Models\Siswa;
use App\Models\User;
use App\Enums\Peran;
use App\Models\LogApproval;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Siswa>
 */
class SiswaFactory extends Factory
{
    protected $model = Siswa::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'nisn' => $this->faker->unique()->numerify('##########'),
        ];
    }
    // public function configure()
    // {
    //     return $this->afterCreating(function(Siswa $siswa){
    //         $siswa->riwayatsekolahsiswa()->create([
    //             'siswa_id' => $siswa->id,
    //             'school_id' => School::inRandomOrder()->first()->id,
    //             'nis' => $this->faker->numerify('#######'),
    //             'start_at' => Carbon::now(),
    //             'end_at' =>null
    //         ]);
    //     });
    // }

    public function hasAkun(): static
    {
        return $this->has(
                Profilable::factory()
                ->state(function(array $attributes, Siswa $siswa)
                {
                    $user = User::create([
                        'name' => $siswa->name,
                        'email' => str_replace(' ', '.', strtolower($siswa->name)). '_' . $siswa->id . '@siswa.com',
                        'password' => Hash::make('password'),
                    ]);
                    $user->assignRole(Peran::SISWA->value);
                    $user->LogApproval()->create([
                        'user_id' => $user->id,
                        'status' => ApprovalEnum::PENDING->value,
                        'description' => 'Pertama kali siswa dibuatkan akun',
                        'evidence_url' => null,
                        'evidence_type' => null,
                        'evidence_source' => null,
                    ]);
                    return [
                        'user_id' => $user->id,
                        'profilable_type' =>$siswa->type,
                        'profilable_id' =>$siswa->id,
                        'peran' => Peran::SISWA->value
                    ];
                })
                ,
                'profile'
            );
    }



}
