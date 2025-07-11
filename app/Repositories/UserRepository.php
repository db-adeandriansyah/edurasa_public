<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\Ptk;
use App\Models\User;
use App\Models\Siswa;
use Illuminate\Database\Eloquent\Builder;
use App\Interfaces\SpecificationsInterface;
use App\Interfaces\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;




class UserRepository implements UserRepositoryInterface
{

    /**
     * Create a new class instance.
     */
    public function __construct(
        protected User $userModel ,
    )
    {
        //
    }

    public function getUserById(string $id)
    {
        return $id;
    }

    public function findUserById(string $id): ?User
    {
        return $this->userModel;
    }

    public function createUser(array $data): User
    {
        return $this->userModel;
    }

    public function updateUser(int $id, array $data): ?User
    {
        return $this->userModel;
    }

    public function deleteUser(int $id): bool
    {
        return true;
    }

     public function getPaginatedUsers( 
                                SpecificationsInterface $specification, 
                                        array $filters = [], 
                                        array $sortBy = [], 
                                        int $perPage = 20, 
                                        int $page = 1,
                                        array $relations =[]
     )
    {
        $query = $this->userModel->newQuery()->with($relations);
        $query = $specification->apply($query);
        
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

    //  public function getUserWithAllDetail(){
    //     return $this->userModel;
    //  }
    /**
     * Get user data with related 'profiles' and 'riwayatPegawaiSekolah'.
     * via 'profilable' relationship.
     * resulting in a collection of User models (many Data).
     * 
     */
    // public function getUserData(): Builder
    // {
        
    //     return $this->userModel->with(['profile.profilable.schools','logApproval']);
        
    // }
    
    // public function getAllUsersWithCurrentSchool():Builder
    // {
    //     $today =  Carbon::today();;
    //     return $this->userModel
    //     // Eager load 'profile' and 'profilable' relationships
    //     ->with([
    //         // 'mengambil method 'profile' yang ada di model User
    //         // lalu dari relasi 'profile' mengambil relasi 'profilable'
    //         // sehingga relasinaya menjadi 'profile.profilable':
    //         'profile.profilable' => function ($morphTo) use ($today) {
    //             // Menggunakan morphWith untuk memuat relasi yang berbeda
    //             // tergantung pada tipe dari 'profilable'.
    //             // 'profilable' bisa berupa Ptk atau Siswa.
    //             $morphTo->morphWith([
    //                 // untuk Ptk, kita memuat relasi 'schools'
    //                 // schools adalah method yang ada di model Ptk
    //                 // method schools ini mengembalikan relasi many-to-many
    //                 // shools diambil dari refrensi di tabel 'ptk_school: pegawaisekolah'
    //                 Ptk::class => ['schools' => function ($query) use ($today) {
    //                     $query->wherePivot('start_at', '<=', $today)
    //                         ->where(function ($q) use ($today) {
    //                             $q->whereNull('end_at')
    //                                 ->orWhere('end_at', '>=', $today);
    //                         })
    //                         ->limit(1);
    //                 }],
    //                 Siswa::class => ['schools' => function ($query) use ($today) {
    //                     $query->wherePivot('start_at', '<=', $today)
    //                             ->where(function ($q) use ($today) {
    //                                 $q->whereNull('end_at')
    //                                     ->orWhere('end_at', '>=', $today);
    //                             })
    //                             ->limit(1);
    //                     }],
    //                 ]);
    //             },
    //             'logApproval',
    //             'permissions'
    //         ]);
    // }

    // public function getAllDataRelationsUserWhereUserIs_InParam(mixed $attributeUser, mixed $shouldValueAttribute): Builder
    // {
    //     return $this->getAllUsersWithCurrentSchool()
    //         ->where($attributeUser, $shouldValueAttribute );
    //     // Implementasi logika untuk mendapatkan data user berdasarkan tipe saat ini
    //     // return $this->userModel->where('type', $currentType)->get();
    // }


    // public function getPtkData()
    // {
    //     // Implementasi logika untuk mendapatkan data ptk
    //     // return Ptk::with(['profile.user'])->get()->toArray(); 
    // }
    
    // public function paginateWithSearch(int $perPage, int $page, ?string $search)
    // {
    //     // $query = User::query()
    //     $query =  $this->getAllUsersWithCurrentSchool();
    //                 // ->with('profile.profilable.schools');

    //     if ($search) {
    //         $query->with('profile.profilable.schools') // eager load school dari PTK/Siswa
    //                 ->when($search, function ($q) use ($search) {
    //                     $q->where('name', 'like', "%{$search}%")
    //                         ->orWhere('email', 'like', "%{$search}%")
    //                         ->orWhere('state_approval', 'like', "%{$search}%")
    //                         ->orWhereHas('profile.profilable', function ($q2) use ($search) {
    //                             $q2->whereHas('schools', function ($q3) use ($search) {
    //                                 $q3->where('name', 'like', "%{$search}%");
    //                             });
    //                         });
    //             });
    //     };
    //     return $query->paginate($perPage)->withQueryString();
    // }
}
