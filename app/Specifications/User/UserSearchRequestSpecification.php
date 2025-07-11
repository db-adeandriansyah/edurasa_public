<?php

namespace App\Specifications\User;

use Illuminate\Database\Eloquent\Builder;
use App\Interfaces\SpecificationsInterface;

class UserSearchRequestSpecification implements SpecificationsInterface
{

    private string $searchTerm;

    public function __construct(string $searchTerm)
    {
        $this->searchTerm = $searchTerm;
    }

    public function apply(Builder $query): Builder
    {
        $search = $this->searchTerm;
        return  $query->with('profile.profilable.schools') // eager load school dari PTK/Siswa
                    ->when($search, function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhere('state_approval', 'like', "%{$search}%")
                            ->orWhereHas('profile.profilable', function ($q2) use ($search) {
                                $q2->whereHas('schools', function ($q3) use ($search) {
                                    $q3->where('name', 'like', "%{$search}%");
                                });
                            });
                });
        // return $query->where(function (Builder $q) {
        //     $q->where('name', 'like', '%' . $this->searchTerm . '%')
        //         ->orWhere('email', 'like', '%' . $this->searchTerm . '%')
        //         ->orWhere('state_approval', 'like', '%' . $this->searchTerm . '%')
        //         //
        //         ->orWhereHas('profile', function ($q2){
        //             $q2->with(['profile.profilable' =>fn($q4)=> $q4->whereHas('schools', function ($q3) {
        //                 $q3->where('name', 'like', '%' . $this->searchTerm . '%');
        //                 })
                        
        //             ])
        //             ->where('peran', '%' . $this->searchTerm . '%')
        //             ;
        //         });
        //         // ->whereHas('schools', function ($q3) {
        //         //         $q3->where('name', 'like', '%' . $this->searchTerm . '%');
        //         //     });
        //         // });
        //         ;
        // });
    }

    
}
