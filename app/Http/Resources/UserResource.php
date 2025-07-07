<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'state_approval' => $this->state_approval,

            // jika ingin menampilkan field lain dimana data tersebut berada di relasi;
            // field ini akan ditampilkan jika relasi tersebut telah dipanggil bersama methdd
            // with() pada query builder, atau load() pada model.
            'peran' => $this->when(
                        // parameter 'profile' adalah nama method relasi yang ada di model User.
                        $this->relationLoaded('profile'), function () {
                            // karena relasi ini satu user memiliki satu profile,
                            // maka kita bisa mengakses field peran dari relasi profile secara langsung.
                            // jika relasi ini memiliki lebih dari satu data, maka kita harus menggunakan
                            // method map() untuk mengakses setiap data dari relasi tersebut.
                            // contoh:
                            // return $this->profile->map(function ($profile) {
                            //     return $profile->peran;
                            // });  return $profile->peran;
                            // if(!$this->profile) {
                            //     return null; // atau bisa juga return 'tidak ada peran';
                            // }
                            return $this->profile?->peran;
                        }),
            'profilable' => $this->when(
                $this->relationLoaded('profile'), 
                fn()=> $this->profile?->profilable_type
            ),
            // Jika field ini tetap ada, meskipun relasinya tidak dimuat,
            // maka kita bisa menggunakan whenLoaded() untuk menghindari error.
            //-
            // 'data_peran' => $this->whenLoaded('profile',function(){
            //     return  $this->profile?->peran;
            //  }), 
            //-----------
            'data_profile' => $this->whenLoaded('profile', function () {

                return match($this->profile->profilable_type) {
                    'App\Models\Ptk' => new PtkResource($this->profile->profilable),
                    'App\Models\Siswa' => new SiswaResource($this->profile->profilable),
                    default => null,
                };
            }),

            'data_sekolah' => $this->whenLoaded('profile', function () {
                return $this->profile->profilable->schools
                    ->map(function ($school) {
                            return [
                                'id' => $school->id,
                                'name' => $school->name,
                                'npsn' => $school->npsn,
                                
                            'type_school' =>$school->type_school,
                                'start_at' => $school->pivot->start_at,
                                'end_at' => $school->pivot->end_at,
                            ];
                        }) ;
                        
                    })?->first() ,
            'log_approval' => $this->when(
                $this->relationLoaded('logApproval'),fn()=>$this->logApproval
            )
        ];
    }
    
}
