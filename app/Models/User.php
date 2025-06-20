<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection as SupportCollection;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles,HasUuids;


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function datafitur(): Collection
    {
        return new Collection([
            'sekolah' => [
                'id' =>'idsekolah',
                'name' => 'SDN Ratujaya 1',
                'npsn' => '20228914',
                'logo' => 'https://versibaru.edurasa.com/assets/kotadepok.webp',

                'id'=>'idalamat',
                'provinsi' => 'Jawa Barat',
                'status_kota' => 'Kota',
                'kota' => 'Depok'
            ],
            'kop' =>[

                    'name' =>'kop_1',
                    'label_name' => 'Dua Kolom',
                    'first_logo' =>'https://versibaru.edurasa.com/assets/kotadepok.webp',
                    'second_log' => 'https://versibaru.edurasa.com/assets/kotadepok.webp',
                    'konten' => 'PEMERINTAH DAERAH KOTA DEPOK'

            ],
            'peran' => $this->roles()?->first()->name,
            'kelas_ampu' =>[
                [
                    'id' =>'kelasid_1',
                    'name' => '6A',
                    'jenjang_id' => 'jenjang_id_1'
                ],
                [
                    'id' =>'kelasid_2',
                    'name' => '6B',
                    'jenjang_id' => 'jenjang_id_1'
                ],
            ]

            ]);
    }
}
