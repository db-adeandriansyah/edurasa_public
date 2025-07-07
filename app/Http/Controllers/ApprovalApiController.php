<?php

namespace App\Http\Controllers;

use Inertia\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceCollection;

class ApprovalApiController extends Controller
{
    public function index(Request $request, UserService $service)
    {
        
        $params = $request->only(['page', 'per_page', 'search']);

        $asli = $service->getPaginatedUsers($params);

        
        return new UserResourceCollection($asli);
    }
}
