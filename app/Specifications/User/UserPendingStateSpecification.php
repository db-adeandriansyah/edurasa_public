<?php

namespace App\Specifications\User;

use Illuminate\Database\Eloquent\Builder;
use App\Interfaces\SpecificationsInterface;

class UserPendingStateSpecification implements SpecificationsInterface
{
    public function apply(Builder $query):Builder
    {
        return $query->where('state_approval','pending');
    }
}
