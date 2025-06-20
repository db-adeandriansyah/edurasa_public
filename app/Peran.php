<?php

namespace App;

enum Peran: string
{
    case SUPER_ADMIN = 'super_admin';
    case ADMIN = 'admin';
    case GURU_KELAS = 'guru_kelas';
    case GURU_MAPEL = 'guru_mapel';
    case OPS = 'ops';
    case PENJAGA = 'penjaga';
    case KEPSEK = 'kepsek';
    case PENGAWAS = 'pengawas';
    case SISWA = 'siswa';
    case ORTU = 'ortu';
    case TAMU = 'tamu';
}
