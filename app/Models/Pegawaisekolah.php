<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

// class Pegawaisekolah extends Model
class Pegawaisekolah extends Pivot
{
    /** @use HasFactory<\Database\Factories\PegawaisekolahFactory> */
    use HasFactory;

    
    public $incrementing = true;

    

}
