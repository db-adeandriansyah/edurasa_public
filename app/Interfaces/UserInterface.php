<?php

namespace App\Interfaces;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Database\Eloquent\Builder as EloquentBuilder;

interface UserInterface
{
    /**
     * Interface ini digunakan untuk mengambil data di tabel user 
     * secara kolektif. Maksudnya tidak mengambil data untuk user yang telah login;
     * Tujuan dar interface:
     * 1. Untuk mengambil data user secara kolektif
     * 2. Untuk mengambil data user yang memiliki relasi dengan profile
     * 3. Untuk mengambil data user yang memiliki relasi dengan profile.profilable
     * 4. Untuk mengambil data user yang memiliki relasi dengan profile.profilable.schools
     * 
     */

     //sediakan property agar bisa dichaing

    


    // //method untuk mendapatkan data user
    // public function getUserData():Builder;

    // //method untuk mendapatkan data ptk
    // public function getPtkData();  
    
    // public function paginateWithSearch(int $perPage, int $page, ?string $search);

    // public function getAllUsers(): Collection;
    // public function getUsersWithRelations(array $relations = []): Collection; // <-- Tambahan

    
    // public function findUserById(int $id): ?User;
    // public function findUserByIdWithRelations(int $id, array $relations = []): ?User; // <-- Tambahan
    // public function createUser(array $data): User;
    // public function updateUser(int $id, array $data): ?User;
    // public function deleteUser(int $id): bool;

    public function getAllUsersWithRelatedPaginations(int $perPage, int $page, ?string $search): LengthAwarePaginator;

}
