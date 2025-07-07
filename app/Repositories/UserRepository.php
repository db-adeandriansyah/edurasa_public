<?php

namespace App\Repositories;

use App\Interfaces\UserInterface;
use App\Models\Ptk;
use App\Models\Siswa;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;


class UserRepository implements UserInterface 
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

    /**
     * Get user data with related 'profiles' and 'riwayatPegawaiSekolah'.
     * via 'profilable' relationship.
     * resulting in a collection of User models (many Data).
     * 
     */
    public function getUserData(): Builder
    {
        
        return $this->userModel->with(['profile.profilable.schools','logApproval']);
        
    }
    
    public function getAllUsersWithCurrentSchool():Builder
    {
        $today =  Carbon::today();;
        return $this->userModel
        // Eager load 'profile' and 'profilable' relationships
        ->with([
            // 'mengambil method 'profile' yang ada di model User
            // lalu dari relasi 'profile' mengambil relasi 'profilable'
            // sehingga relasinaya menjadi 'profile.profilable':
            'profile.profilable' => function ($morphTo) use ($today) {
                // Menggunakan morphWith untuk memuat relasi yang berbeda
                // tergantung pada tipe dari 'profilable'.
                // 'profilable' bisa berupa Ptk atau Siswa.
                $morphTo->morphWith([
                    // untuk Ptk, kita memuat relasi 'schools'
                    // schools adalah method yang ada di model Ptk
                    // method schools ini mengembalikan relasi many-to-many
                    // shools diambil dari refrensi di tabel 'ptk_school: pegawaisekolah'
                    Ptk::class => ['schools' => function ($query) use ($today) {
                        $query->wherePivot('start_at', '<=', $today)
                            ->where(function ($q) use ($today) {
                                $q->whereNull('end_at')
                                    ->orWhere('end_at', '>=', $today);
                            })
                            ->limit(1);
                    }],
                    Siswa::class => ['schools' => function ($query) use ($today) {
                        $query->wherePivot('start_at', '<=', $today)
                                ->where(function ($q) use ($today) {
                                    $q->whereNull('end_at')
                                        ->orWhere('end_at', '>=', $today);
                                })
                                ->limit(1);
                        }],
                    ]);
                },
                'logApproval'
            ]);
    }

    public function getAllDataRelationsUserWhereUserIs_InParam(mixed $attributeUser, mixed $shouldValueAttribute): Builder
    {
        return $this->getAllUsersWithCurrentSchool()
            ->where($attributeUser, $shouldValueAttribute );
        // Implementasi logika untuk mendapatkan data user berdasarkan tipe saat ini
        // return $this->userModel->where('type', $currentType)->get();
    }


    public function getPtkData()
    {
        // Implementasi logika untuk mendapatkan data ptk
        // return Ptk::with(['profile.user'])->get()->toArray();
    }
    
     public function paginateWithSearch(int $perPage, int $page, ?string $search)
    {
        // $query = User::query()
        $query =  $this->getAllUsersWithCurrentSchool();
                    // ->with('profile.profilable.schools');

        if ($search) {
            $query->with('profile.profilable.schools') // eager load school dari PTK/Siswa
                ->when($search, function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('state_approval', 'like', "%{$search}%")
                    ->orWhereHas('profile.profilable', function ($q2) use ($search) {
                        $q2->whereHas('schools', function ($q3) use ($search) {
                            $q3->where('name', 'like', "%{$search}%");
                        });
                    });
                })
            //-----
            // $query->where(function ($q) use ($search) {
            //             $q->where('name', 'like', "%{$search}%")
            //             ->orWhere('email', 'like', "%{$search}%");
            //         })
            //         ->orWhereHas('profile', fn($qs)=> $qs ->where('peran','like',"%{$search}%"))
            //         ->orWhereHas('profile.profilable', fn($qschool)=> $qschool->where('name', 'like',"{%$search%}")
            //                                                         ->orWhereHas('schools',fn($qq)=> $qq->where('name', 'like',"{%$search%}"))
            //         ) 
                    ;
                    
        };
        
        // $total = $query->count();
        // $maxPage = ceil($total / $perPage);
        // $page = min($page, $maxPage);

        // return $query->paginate($perPage, ['*'], 'page', $page);
        // return $query->paginate($perPage, ['*'], 'page', $page)->withQueryString();
        return $query->paginate($perPage)->withQueryString();
    }
}
