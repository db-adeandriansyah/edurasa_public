<?php

namespace App\Models;

use App\Models\Profilable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Siswa extends Model
{
    /** @use HasFactory<\Database\Factories\SiswaFactory> */
    use HasFactory;
    
    protected $fillable = [
        'name', 'nisn'
    ];

    public function profile(): MorphOne
    {
        return $this->morphOne(Profilable::class, 'profilable');
    }

    /**
     * tabel school_siswas
     */
    public function riwayatsekolahsiswa():BelongsToMany
    {
        return $this->belongsToMany(
            School::class,
            'sekolahsiswas',
            'siswa_id',
            'school_id'
        )->withPivot(['nis', 'start_at', 'end_at'])
                ->withTimestamps();;
    }

    public function schools():BelongsToMany
    {
        return $this->belongsToMany(
            School::class,
            'sekolahsiswas',
            'siswa_id',
            'school_id'
        )->withPivot(['nis', 'start_at', 'end_at'])
                ->withTimestamps();;
    }
    public function latestSchools(): HasOne
    {
        return $this->hasOne(School::class)->latestOfMany();
    }
}
