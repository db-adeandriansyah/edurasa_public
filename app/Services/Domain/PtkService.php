<?php

namespace App\Services\Domain;

use App\Interfaces\PtkRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PtkService
{
    

    /**
     * Create a new class instance.
     */
    public function __construct(
        protected PtkRepositoryInterface $ptkRepository,
        protected array $filters = [],
        protected array $sortBy = [],
        protected int $perPage = 20,
        protected int $page = 1

    
    )
    {
        //
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
    
        
        // $specificationCurrentSchool = '';
        
        return $this->ptkRepository->getPaginatedUsers(
            // specification?: '',//$sepecifications,
            filters: $this->filters,
            sortBy: $this->sortBy,
            perPage: $this->perPage,
            page: $this->page,
            relations: ['riwayatPegawaiSekolah','profile',]
        );
    }
}
