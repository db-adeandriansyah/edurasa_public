<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Ptk extends Model
{
    /** @use HasFactory<\Database\Factories\PtkFactory> */
    use HasFactory;
    protected $fillable = [
        'name', 'nip', 'nuptk'
    ];

    public function profile(): MorphOne
    {
        return $this->morphOne(Profilable::class, 'profilable');
    }

    public function riwayatPegawaiSekolah(): BelongsToMany
    {
        return $this->belongsToMany(
            School::class,
            'pegawaisekolahs',
            'ptk_id',
            'school_id'
        )->withPivot(['start_at', 'end_at'])
                ->withTimestamps();;
    }
    public function schools(): BelongsToMany
    {
        return $this->belongsToMany(
            School::class,
            'pegawaisekolahs',
            'ptk_id',
            'school_id'
        )->withPivot(['start_at', 'end_at'])
                ->withTimestamps();;
    }


    public function latestSchools(): HasOne
    {
        return $this->hasOne(School::class)->latestOfMany();
    }
}
