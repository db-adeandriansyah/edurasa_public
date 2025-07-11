<?php

namespace App\Specifications;

use InvalidArgumentException;
use Illuminate\Database\Eloquent\Builder;
use App\Interfaces\SpecificationsInterface;

class AndQuerSpecification implements SpecificationsInterface
{
    
    /**
     * @var SpecificationsInterface[]
     */
    private array $specifications;

    /**
     * @param SpecificationsInterface[] $specifications Array spesifikasi yang akan digabungkan.
     */
    public function __construct(array $specifications = [])
    {
        foreach ($specifications as $specification) {
            if (!$specification instanceof SpecificationsInterface) {
                throw new InvalidArgumentException('All specifications must implement SpecificationsInterface.');
            }
        }
        $this->specifications = $specifications;
    }

    /**
     * Menambahkan spesifikasi ke dalam komposit.
     * @param SpecificationsInterface $specification
     * @return void
     */
    public function addSpecification(SpecificationsInterface $specification): void
    {
        $this->specifications[] = $specification;
    }

    /**
     * Menerapkan semua spesifikasi yang terkandung ke query builder menggunakan operator AND.
     * @param Builder $query
     * @return Builder
     */
    public function apply(Builder $query): Builder
    {
        foreach ($this->specifications as $specification) {
            $query = $specification->apply($query);
        }
        return $query;
    }

}
