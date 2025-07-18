<?php

namespace App\Services;

use App\Enums\ApprovalEnum;
use App\Repositories\UserRepository;
use App\Interfaces\UserRepositoryInterface;
use App\Specifications\AndQuerSpecification;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Specifications\User\UserPendingStateSpecification;
use App\Specifications\User\UserCurrentSchoolSpecification;
use App\Specifications\User\UserSearchRequestSpecification;


class UserService
{
    protected UserRepositoryInterface $userRepository;
    protected array $filters = [];
    protected array $sortBy = [];
    protected int $perPage = 20;
    protected int $page = 1;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        
    }
    /**
     * Create a new class instance.
     */
    // public function __construct(
    //     /** di PHP > 8 terdapat fitur proposal property promotion
    //     * yang memungkinkan kita untuk mendeklarasikan properti
    //     * pada constructor, sehingga kita tidak perlu mendeklarasikan
    //     * properti tersebut di dalam class. 
    //      * Juga kita bisa langsung menginisialisasi
    //      * properti tersebut dengan nilai default.
    //      * * Contoh:
    //      * protected UserRepository $userRepo;
    //      * public function __construct(UserRepository $userRepo)
    //      * {
    //      *      $this->userRepo = $userRepo;
    //      * }
    //     */
    //     protected UserRepository $userRepository 
    // )
    // {
    
    // }

    
    // //method untuk mendapatkan data user
    // public  function getUserData(): Collection
    // {
    //     return $this->userRepo->getUserData()->get();      
    // }

    // public function getAllUsersWithCurrentSchool(int $perPage = 20): LengthAwarePaginator
    // {
    //     // Menggunakan UserRepository untuk mendapatkan data user
    //     return $this->userRepo->getAllDataRelationsUserWhereUserIs_InParam('state_approval', ApprovalEnum::PENDING)
    //         ->paginate($perPage);
    // }

    // public function getAllUsersDataRelationsWhereApprovalPending(int $perPage = 20): LengthAwarePaginator
    // {
    //     // Menggunakan UserRepository untuk mendapatkan data user 
    //     return $this->userRepo->getAllDataRelationsUserWhereUserIs_InParam('state_approval', ApprovalEnum::PENDING)

    //         ->paginate($perPage);//->withQueryString();
    // }

    // public function getAllUsersDataRelationsWhereAllApproval(int $perPage = 20): LengthAwarePaginator
    // {
    //     // Menggunakan UserRepository untuk mendapatkan data user
    //     return $this->userRepo->getAllUsersWithCurrentSchool()->paginate($perPage);//->withQueryString();
    // }

    // public function getPaginatedUsers(array $params)
    // {
    //     $perPage = $params['per_page'] ?? 20;
    //     $page = $params['page'] ?? 1;
    //     $search = $params['search'] ?? null;
        
    //     return $this->userRepo->paginateWithSearch($perPage, $page, $search);
    // }
    
    public function execute(
        array $params
        ):LengthAwarePaginator
    {
        if(isset($params['per_page'])){
            $this->perPage = $params['per_page'];
        }
        
        if(isset($params['page'])){
            $this->page = $params['page'];
        }
        
        if(isset($params['search'])){
            $this->filters['search'] = $params['search'];
        }
    
        
        $specificationCurrentSchool = new UserCurrentSchoolSpecification();
        
        return $this->userRepository->getPaginatedUsers(
            specification:  $specificationCurrentSchool,//$sepecifications,
            filters: $this->filters,
            sortBy: $this->sortBy,
            perPage: $this->perPage,
            page: $this->page,
            relations: ['logApproval','roles','roles.permissions','permissions' ]
        );
    }
}
