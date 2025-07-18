<?php

namespace App\Http\Controllers\Ptk;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

use App\Services\Domain\PtkService;
use App\Http\Controllers\Controller;
use App\Http\Resources\PtkResource;
use App\Http\Resources\PtkApiResourceCollection;


class PtkController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, PtkService $service): Response
    {
        $data = $service->execute($request->query());
        return Inertia::render('ptk/index',[
            'data' => new PtkApiResourceCollection($data),
            'asli' => $data
        ]);
    }
}
