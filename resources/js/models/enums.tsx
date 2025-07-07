export enum PeranEnum{
    SUPER_ADMIN = 'super admin',
    ADMIN = 'admin',
    GURU_KELAS = 'guru kelas',
    GURU_MAPEL = 'guru mapel',
    OPS = 'ops',
    PENJAGA = 'penjaga',
    KEPSEK = 'kepsek',
    PENGAWAS = 'pengawas',
    SISWA = 'siswa',
    ORTU = 'ortu',
    TAMU = 'tamu',
}

export enum ApprovalEnum{
    // enum default. Setiap kali pengunjung melakukan registrasi, maka akan mendapatkan status ini
    PENDING = 'pending',
    // enum ketika benar-benar telah diterima oleh admin
    ACCEPTED = 'accepted',
    // enum ketika ditolak oleh admin
    REJECTED = 'rejected', 
    // enum ketika akun telah dihapus oleh admin
    DELETED = 'deleted',       
    // enum ketika akun telah dihapus oleh admin
    BLOCKED = 'blocked',
}