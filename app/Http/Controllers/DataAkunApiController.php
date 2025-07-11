<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\DataApiCollection;

class DataAkunApiController extends Controller
{
    public function index(Request $request, UserService $service)
    {
        $asli = $service->execute(
            $request->query()
        );

        return new DataApiCollection($asli);
    }
}
