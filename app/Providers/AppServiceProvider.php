<?php

namespace App\Providers;

use App\Services\Domain\PtkService;
use Illuminate\Support\ServiceProvider;
use App\Services\UseCase\UserApprovalPendingService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(
            'App\Interfaces\UserRepositoryInterface', 'App\Repositories\UserRepository'
        );
        
        $this->app->bind(
            'App\Interfaces\PtkRepositoryInterface', 'App\Repositories\PtkRepository'
        );
        
        $this->app->singleton(UserApprovalPendingService::class);
        $this->app->singleton(PtkService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
