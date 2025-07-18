<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\School;
use App\Models\Permission;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\DataApiCollection;
use App\Http\Resources\UserResourceCollection;
use App\Services\UseCase\UserApprovalPendingService;

class DataAkunController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, UserService $service) 
    {
        if($request->query('page') || $request->query('search') || $request->query()){
            if (!$request->ajax()) {
                // return response()->json([
                    //     'message' => 'This endpoint is only accessible via AJAX.',
                    // ], 403);
                    return abort(403,'Ga boleh mengakses apapun dari URL');
                }
                return abort(403,'Ga boleh mengakses apapun dari URL');
        }

        $asli = $service->execute($request->query());
        $permission = Permission::get();
        $schools = School::all();

        return Inertia::render('daftar-akun/index',[
            'data' => new DataApiCollection($asli),
            'permission' => $permission,
            'dataschool' =>$schools
            ]
        );
    }
}
