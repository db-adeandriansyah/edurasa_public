<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Collection;

trait UserHelperAja
{
    public function dataprofil2(): Collection
    {
        
        return new Collection([
            'sekolah' => [
                'id' =>'school_tapel_id',
                'name' => 'SD Negeri Ratujaya 1',
                'use_uptd'=>true,
                'type_school' => 'SD',
                'npsn' => '20212345',
                'nss' => '101010101010101',
                'logo' => 'https://versibaru.edurasa.com/assets/ratujaya1.png',

                'provinsi_name' => 'Jawa Barat',
                'provinsi_logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Coat_of_arms_of_West_Java.svg/800px-Coat_of_arms_of_West_Java.svg.png',
                'kota_status' => 'Kota',
                'kota_name' => 'Depok',
                'kota_logo' => 'https://versibaru.edurasa.com/assets/kotadepok.webp',
                'kecamatan_name' => 'Cipayung',
                'kelurahan_status' => 'Kelurahan',
                'kelurahan_name' => 'Ratujaya',
                'alamat' => 'Jl. SMP Ratujaya No. 41',
                'kode_pos' => '16436',

                'kepsek_name' => 'Yoce Magdalena,S.Pd.SD',
                'kepsek_nip' => '198001012005012003',
            ],
            //kop yang disimpan di database:
            
            'kop_custom' =>[
                [
                    'id' =>'custom_type_id_1',
                    'type_kop' =>'custom_type_1',
                    'label_name' => 'Dua Kolom',
                    'konten' => 'PEMERINTAH DAERAH KOTA DEPOK HTML'
                ]

            ],
            'peran' => $this->roles()?->first()->name,

            'kelas_ampu' =>[
                    [
                        'id' =>'kelasid_1',
                        'name' => '6A',
                        'jenjang_id' => 'jenjang_id_1',
                        'jenjang_name' => '6',
                        'walas_name' => 'Siti Aminah,S.Pd.SD',
                        'walas_nip' => '198001012005012004',
                    ],
                    [
                        'id' =>'kelasid_2',
                        'name' => '6B',
                        'jenjang_id' => 'jenjang_id_1',
                        'jenjang_name' => '6',
                        'walas_name' => 'Badriah,S.Pd.SD',
                        'walas_nip' => '198001012005012005',
                    ],
                    [
                        'id' =>'kelasid_3',
                        'name' => '5A',
                        'jenjang_id' => 'jenjang_id_2',
                        'jenjang_name' => '5',
                        'walas_name' => 'Samsul,S.Pd.SD',
                        'walas_nip' => '198101012005012005',
                    ],
                ]
                
            ]);
    }
    
}
