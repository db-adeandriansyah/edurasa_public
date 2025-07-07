<?php

namespace App\Repositories;

class SchoolRepository
{
    
    public function getSchoolData()
    {
        // This method should return the school data.
        // For now, we will return a placeholder array.
        return [
            'name' => 'Sekolah Dasar Contoh',
            'address' => 'Jl. Contoh No. 123, Jakarta',
            'phone' => '021-12345678',
            'email' => '        '
        ];  
    }
}
