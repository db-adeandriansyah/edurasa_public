<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Builder;

interface SpecificationsInterface
{
    public function apply(Builder $builder): Builder;
}
