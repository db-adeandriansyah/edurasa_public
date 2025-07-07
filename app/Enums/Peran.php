<?php

namespace App\Enums;

enum Peran: string
{
    case SUPER_ADMIN = 'super admin';
    case ADMIN = 'admin';
    case GURU_KELAS = 'guru kelas';
    case GURU_MAPEL = 'guru mapel';
    case OPS = 'ops';
    case PENJAGA = 'penjaga';
    case KEPSEK = 'kepsek';
    case PENGAWAS = 'pengawas';
    case SISWA = 'siswa';
    case ORTU = 'ortu';
    case TAMU = 'tamu';
}
