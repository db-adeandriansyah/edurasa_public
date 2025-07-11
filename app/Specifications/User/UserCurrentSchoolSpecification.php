<?php

namespace App\Specifications\User;

use Carbon\Carbon;
use App\Models\Ptk;
use App\Models\Siswa;
use Illuminate\Database\Eloquent\Builder;
use App\Interfaces\SpecificationsInterface;

/**
 * class yang menginstansiasinya akan melakukan query di model User dengan ketentuan:
 * - User yang memiliki 'profile' <polymorphic> berupa PTK/Siswa akan dicari data 'schools'-nya
 *   via relasi dari 'profile.profilable' yang merujuk tabel PTK/Siswa. 
 * - Model PTK/Siswa punya relasi ke model School via method 'schools' di model PTK/Siswa-nya;
 * - Model PTK/Siswa bisa saja memiliki banyak data 'schools' di relasinya (karena memang berelasi 'hasMany')
 *   sehingga yang akan difilter / diQuery adalah data schools-nya yang masih aktif
 * - Proses me-requery-nya di tingkat relasi (di method 'with') dengan syarat 'start_at' < today atau 'end_at' == null
 */
class UserCurrentSchoolSpecification implements SpecificationsInterface
{
    public function apply(Builder $query):Builder
    {
        $today =  Carbon::today();
        return $query->with([
            'profile.profilable' => function ($morphTo) use ($today) {
                $morphTo->morphWith([
                    Ptk::class => ['schools' => function ($query) use ($today) {
                        $query->wherePivot('start_at', '<=', $today)
                            ->where(function ($q) use ($today) {
                                $q->whereNull('end_at')
                                    ->orWhere('end_at', '>=', $today);
                            })
                            ->limit(1);
                    }],
                    Siswa::class => ['schools' => function ($query) use ($today) {
                        $query->wherePivot('start_at', '<=', $today)
                                ->where(function ($q) use ($today) {
                                    $q->whereNull('end_at')
                                        ->orWhere('end_at', '>=', $today);
                                })
                                ->limit(1);
                        }],
                    ]);
                }
            ]);
    }
    
}
