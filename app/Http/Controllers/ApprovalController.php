<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceCollection;
use App\Models\Ptk;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApprovalController extends Controller
{
    /**
     * Display the approval page.
     */
    public function index(Request $request, UserService $service):Response
    {
        if($request->query('page') || $request->query('search') || $request->query()){
            if (!$request->ajax()) {
                // return response()->json([
                    //     'message' => 'This endpoint is only accessible via AJAX.',
                    // ], 403);
                    return abort(403,'Ga boleh mengakses apapun dari URL');
                }
                return abort('403','Ga boleh mengakses apapun dari URL');
        }

        $asli = $service->getAllUsersDataRelationsWhereApprovalPending();;//->toResourceCollection();
        // dd($asli);
        // dd(!$request->query());
        return Inertia::render('approval/data-approval'
            ,[
                //  'data' => (new UserResource($ptk))//->setAllowedFields(['name','data_sekolah.name'])
                //  ,
                // 'data' => UserResource::collection($asli),//,setAllowedFields(['name','data_sekolah.name']),
                'data' =>new UserResourceCollection($asli)
            ]
        );
    }
    public function indexcari(Request $request){
        return 'hallo cari apa';
    }

}
