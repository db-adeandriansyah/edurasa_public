<?php

namespace App\Repositories;

use App\Models\Ptk;
use App\Interfaces\PtkRepositoryInterface;
use App\Interfaces\SpecificationsInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PtkRepository implements PtkRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected Ptk $ptkModel
    )
    {
        //
    }

    // public function createUser(array $data): User
    // {
    //     return $this->ptkModel;
    // }
    
    // public function updateUser(int $id, array $data): ?User
    // {
    //     return $this->ptkModel;
    // }
    
    // public function deleteUser(int $id): bool
    // {
    //     return $this->ptkModel;
    // }
    
    public function getPaginatedUsers(
                            // ?SpecificationsInterface $specification,
                            array $filters = [],
                            array $sortBy = [],
                            int $perPage = 20,
                            int $page = 1,
                            array $relations =[]
                        ):LengthAwarePaginator
    {
        $query = $this->ptkModel->newQuery()->with($relations);
        // if($specification){
        //     $query = $specification->apply($query);

        // }
        
        if (!empty($filters)) {
            foreach ($filters as $key => $value) {
                if ($key === 'search' && !empty($value)) {
                        $query->when($value, function ($q) use ($value) {
                            $q->where('name', 'like', "%{$value}%")
                                ->orWhere('email', 'like', "%{$value}%")
                                ->orWhere('state_approval', 'like', "%{$value}%")
                                ->orWhereHas('profile.profilable', function ($q2) use ($value) {
                                    $q2->where('peran', 'like', "%{$value}%")
                                    ->OrWhereHas('schools', function ($q3) use ($value) {
                                        $q3->where('name', 'like', "%{$value}%");
                                    });
                                });
                    });
                }
            }
        }

        // Terapkan Sorting
        if (!empty($sortBy) && isset($sortBy['column'])) {
            $column = $sortBy['column'];
            $direction = $sortBy['direction'] ?? 'asc'; // Default ascending
            $query->orderBy($column, $direction);
        } else {
            $query->orderBy('created_at', 'asc');
        }
        return $query->paginate($perPage)->withQueryString();
    }
}
