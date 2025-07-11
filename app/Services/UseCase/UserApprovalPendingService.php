<?php

namespace App\Services\UseCase;

use App\Interfaces\UserRepositoryInterface;

use App\Specifications\AndQuerSpecification;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Specifications\User\UserPendingStateSpecification;
use App\Specifications\User\UserCurrentSchoolSpecification;
use App\Specifications\User\UserSearchRequestSpecification;

class UserApprovalPendingService
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
    
        
        $pendingState = new UserPendingStateSpecification();
        $specificationCurrentSchool = new UserCurrentSchoolSpecification();
        $sepecifications = new AndQuerSpecification([$pendingState,$specificationCurrentSchool]);
        
        
        return $this->userRepository->getPaginatedUsers(
            specification:  $sepecifications,
            filters: $this->filters,
            sortBy: $this->sortBy,
            perPage: $this->perPage,
            page: $this->page,
            relations: ['logApproval']
        );
    }
}
