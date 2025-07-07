<?php

namespace App\Services;

use App\Enums\ApprovalEnum;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;


class UserService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        /** di PHP > 8 terdapat fitur proposal property promotion
        * yang memungkinkan kita untuk mendeklarasikan properti
        * pada constructor, sehingga kita tidak perlu mendeklarasikan
        * properti tersebut di dalam class. 
         * Juga kita bisa langsung menginisialisasi
         * properti tersebut dengan nilai default.
         * * Contoh:
         * protected UserRepository $userRepo;
         * public function __construct(UserRepository $userRepo)
        */
        protected UserRepository $userRepo 
    )
    {
       
    }
    //method untuk mendapatkan data user
    public  function getUserData(): Collection
    {
        return $this->userRepo->getUserData()->get();      
    }

    public function getAllUsersWithCurrentSchool(int $perPage = 20): LengthAwarePaginator
    {
        // Menggunakan UserRepository untuk mendapatkan data user
        return $this->userRepo->getAllDataRelationsUserWhereUserIs_InParam('state_approval', ApprovalEnum::PENDING)
            ->paginate($perPage);
    }

    public function getAllUsersDataRelationsWhereApprovalPending(int $perPage = 20): LengthAwarePaginator
    {
        // Menggunakan UserRepository untuk mendapatkan data user
        return $this->userRepo->getAllDataRelationsUserWhereUserIs_InParam('state_approval', ApprovalEnum::PENDING)

            ->paginate($perPage);//->withQueryString();
    }

    public function getPaginatedUsers(array $params)
    {
        $perPage = $params['per_page'] ?? 20;
        $page = $params['page'] ?? 1;
        $search = $params['search'] ?? null;
        
        return $this->userRepo->paginateWithSearch($perPage, $page, $search);
    }

}
