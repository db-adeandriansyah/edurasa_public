<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogApproval extends Model
{
    /** @use HasFactory<\Database\Factories\LogApprovalFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'description',
        'evidence_url',
        'evidence_type',
        'evidence_source'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
