<?php

namespace App\Providers;

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
        
        $this->app->singleton(UserApprovalPendingService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
