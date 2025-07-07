<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class School extends Model
{
    /** @use HasFactory<\Database\Factories\SchoolFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'npsn',
        'type_school'
    ];

    /**
     * relasi: ptk_school
     */
    public function ptks():BelongsToMany
    {
        return $this->belongsToMany(
            // argumen pertama mengambil data apa? 
            // dalam hal ini adalah data dari PTK, 
            // maka yang diambil adalah ari class/model dari ptk
            Ptk::class,
            // nama tabel pivot ini adalah (pegawaisekolahs)
            // lihat nama tabel-nya, jika ada huruf(s), sertakan!
            'pegawaisekolahs',
            // id milik class ini (School) di pivot tabel apa?
            // ternyata di pivot, refrensi idnya bernama: school_id
            'school_id',
            //karena kita akan mengambil data PTK dari tabel pivot,
            // maka foreignKey PTK di pivot ini apa?
            //ternyata adalah ptk_id
            'ptk_id' )
        ->withPivot(['start_at', 'end_at'])
        ->withTimestamps();;
    }

    /**
     * relasi School_siswa
     */
    public function siswas():BelongsToMany
    {
        return $this->belongsToMany(
            // argumen pertama mengambil data apa? 
            // dalam hal ini adalah data dari Siswa, 
            // maka yang diambil adalah ari class/model dari Siswa
            Siswa::class,
            // nama tabel pivot ini adalah (pegawaisekolahs)
            // lihat nama tabel-nya, jika ada huruf(s), sertakan!
            'sekolahsiswas',
            // id milik class ini (School) di pivot tabel apa?
            // ternyata di pivot, refrensi idnya bernama: school_id
            'school_id',
            //karena kita akan mengambil data PTK dari tabel pivot,
            // maka foreignKey PTK di pivot ini apa?
            //ternyata adalah ptk_id
            'siswa_id'
        )->withPivot(['nis', 'start_at', 'end_at'])
        ->withTimestamps();;
    }
}
