<?php

namespace App\Interfaces;

use App\Models\User;
use App\Interfaces\SpecificationsInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;


interface UserRepositoryInterface
{
    //
    /** method-method abstrak di sini belum diketahui apakah sudah ditangani oleh Laravel
     * atau belum. Biasanya method CRUD, terutama Create ditangani oleh proses authentication
     * pada Laravel. Jadi kita tuliskan saja dulu.
     */
    //public function getAllUsers(): Collection;
    public function getUserById(string $id);
    public function findUserById(string $id): ?User;
    public function createUser(array $data): User;
    public function updateUser(int $id, array $data): ?User;
    public function deleteUser(int $id): bool;

    /**
     * method ini digunakan saat mengambil data keseluruhan atau sebagian (collection)
     * dengan kriteria tertentu berdasarkan QueriBuilder dan Pagination;
     */
    public function getPaginatedUsers(
        SpecificationsInterface $specification,
        array $filters = [],
        array $sortBy = [],
        int $perPage = 20,
        int $page = 1,
        array $relations =[]
    );

}
