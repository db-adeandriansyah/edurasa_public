<?php

namespace App\Http\Controllers\Ptk;

use Illuminate\Http\Request;
use App\Services\Domain\PtkService;
use App\Http\Controllers\Controller;
use App\Http\Resources\PtkApiResourceCollection;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PtkApiController extends Controller
{
    public function index(Request $request, PtkService $service): ResourceCollection
    {
        $data = $service->execute($request->query());
        return  new PtkApiResourceCollection($data);
    }
}
