<?php

namespace App\Http\Controllers;

use Inertia\Controller;
use Illuminate\Http\Request;


use App\Services\UserService;
use App\Http\Resources\UserResourceCollection;
use App\Services\UseCase\UserApprovalPendingService;

class ApprovalApiController extends Controller
{
    public function index(Request $request, UserApprovalPendingService $fetchPaginatedUsersUseCase)
    {
        $asli = $fetchPaginatedUsersUseCase->execute(
            $request->query()
        );

        return new UserResourceCollection($asli);
    }

    
}
