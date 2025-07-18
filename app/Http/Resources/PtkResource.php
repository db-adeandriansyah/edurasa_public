<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PtkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $today = now()->toDateString(); // atau Carbon::now() juga bisa
        return [
            'ptk_id' => $this->id,
            'nuptk' => $this->nuptk,
            'name' => $this->name,
            'nip' => $this->nip,
            'peran'=>$this->whenLoaded('profile',fn()=> $this->profile->peran),
            'hasAkun'=>$this->whenLoaded('profile',fn()=> $this->profile->user_id? true:false),
            'tempat_mengajar' => $this->whenLoaded('riwayatPegawaiSekolah', function () {
                return $this->riwayatPegawaiSekolah->map(function ($school) {
                    return [
                        'school_id' => $school->id,
                        'school_name' => $school->name,
                        'school_npsn' => $school->npsn,
                        'school_type_school' =>$school->type_school,
                        'school_start_at' => $school->pivot->start_at,
                        'school_end_at' => $school->pivot->end_at,
                    ];
                }) ;
            }),
            'tempat_mengajar_aktif' => $this->whenLoaded('riwayatPegawaiSekolah', function () use ($today) {
                $school = $this->riwayatPegawaiSekolah
                    ->filter(function ($school) use ($today) {
                        $start = $school->pivot->start_at;
                        $end = $school->pivot->end_at;

                        return $start <= $today && (is_null($end) || $end >= $today);
                    })
                    ->first();

                return $school ? [
                    'school_id' => $school->id,
                    'school_name' => $school->name,
                    'school_npsn' => $school->npsn,
                    'school_type_school' => $school->type_school,
                    'school_start_at' => $school->pivot->start_at,
                    'school_end_at' => $school->pivot->end_at,
                ] : null;
            }),
        ];
    }
}
