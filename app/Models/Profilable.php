<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Profilable extends Model
{
    /** @use HasFactory<\Database\Factories\ProfilableFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'profilable_type',
        'profilable_id',
        'peran'
    ];
    
    public function profilable():MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
