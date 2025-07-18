<?php

namespace App\Interfaces;

use App\Interfaces\SpecificationsInterface;
use Illuminate\Pagination\LengthAwarePaginator;


interface PtkRepositoryInterface
{
    //
    
    // public function createPtk(array $data): User;
    // public function updateUser(int $id, array $data): ?User;
    // public function deleteUser(int $id): bool;
    public function getPaginatedUsers(
        // ?SpecificationsInterface $specification,
        array $filters = [],
        array $sortBy = [],
        int $perPage = 20,
        int $page = 1,
        array $relations =[]
    ):LengthAwarePaginator;
}
