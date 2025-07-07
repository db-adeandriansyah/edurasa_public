<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Sekolahsiswa extends Pivot
{
    /** @use HasFactory<\Database\Factories\SekolahsiswaFactory> */
    use HasFactory;
    
    
    
    public $incrementing = true;
}
