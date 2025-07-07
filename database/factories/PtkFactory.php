<?php

namespace Database\Factories;

use App\Enums\ApprovalEnum;
use App\Models\Profilable;
use App\Models\Ptk;
use App\Models\School;
use App\Models\User;
use App\Enums\Peran;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ptk>
 */
class PtkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'nip' => fake()->numerify('19###### ###### # 0##'),
            'nuptk' =>fake()->numerify('#### #### #### ####')
        ];
    }

    // public function configure()
    // {
    //     return $this->afterCreating(function(Ptk $ptk){
            
    //         $ptk->riwayatPegawaiSekolah()->create([
    //             'ptk_id' => $ptk->id,
    //             'school_id' => School::inRandomOrder()->first()->id,
    //             'start_at' => Carbon::now(),
    //             'end_at' =>null
    //         ]);
    //     });
    // }

    public function hasAkunForRolesGK(): static
    {
        return $this->has(
            Profilable::factory()
            ->state(function(array $attributes, Ptk $ptk)
            {
                $user = User::create([
                    'name' => $ptk->name,
                    'email' => str_replace(' ', '.', strtolower($ptk->name)) . '@ptk.com' ?? fake()->unique()->email(),
                    'password' => Hash::make('password'),
                ]);
                $user->assignRole(Peran::GURU_KELAS->value);
                
                    $user->LogApproval()->create([
                        'user_id' => $user->id,
                        'status' => ApprovalEnum::PENDING->value,
                        'description' => 'Pertama kali PTK dibuatkan akun',
                        'evidence_url' => null,
                        'evidence_type' => null,
                        'evidence_source' => null,
                    ]);
                return [
                    'user_id' => $user->id,
                    'profilable_type' =>$ptk->type,
                    'profilable_id' =>$ptk->id,
                    'peran' => PERAN::GURU_KELAS->value
                ];
            })
            ,
            'profile'
        );
    }
    public function hasAkunForRolesGMP(): static
    {
        return $this->has(
            Profilable::factory()
                ->state(function(array $attributes, Ptk $ptk)
                {
                    $user = User::create([
                        'name' => $ptk->name,
                        'email' => str_replace(' ', '.', strtolower($ptk->name)) . '@ptk.com',
                        'password' => Hash::make('password'),
                    ]);
                    $user->assignRole(Peran::GURU_MAPEL->value);
                    return [
                        'user_id' => $user->id,
                        'profilable_type' =>$ptk->type,
                        'profilable_id' =>$ptk->id,
                        'peran' => PERAN::GURU_MAPEL->value
                    ];
                })
                ,
                'profile'
            );
    }
    
    
}
