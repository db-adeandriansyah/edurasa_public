<?php

namespace App\Enums;

enum ApprovalEnum: string
{
    // enum default. Setiap kali pengunjung melakukan registrasi, maka akan mendapatkan status ini
    case PENDING = 'pending';
    // enum ketika benar-benar telah diterima oleh admin
    case ACCEPTED = 'accepted';
    // enum ketika ditolak oleh admin
    case REJECTED = 'rejected'; 
    // enum ketika akun telah dihapus oleh admin
    case DELETED = 'deleted';       
    // enum ketika akun telah dihapus oleh admin
    case BLOCKED = 'blocked';
    
}
