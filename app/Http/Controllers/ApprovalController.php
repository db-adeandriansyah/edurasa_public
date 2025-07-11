<?php

namespace App\Http\Controllers;

use App\Models\Ptk;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceCollection;
use App\Services\UseCase\UserApprovalPendingService;

class ApprovalController extends Controller
{
    /**
     * Display the approval page.
     */
    // public function index(Request $request, UserService $service):Response
    // {
    //     if($request->query('page') || $request->query('search') || $request->query()){
    //         if (!$request->ajax()) {
    //             // return response()->json([
    //                 //     'message' => 'This endpoint is only accessible via AJAX.',
    //                 // ], 403);
    //                 return abort(403,'Ga boleh mengakses apapun dari URL');
    //             }
    //             return abort(403,'Ga boleh mengakses apapun dari URL');
    //     }

    //     $asli = $service->getAllUsersDataRelationsWhereApprovalPending();;//->toResourceCollection();
    //     // dd($asli);
    //     // dd(!$request->query());
    //     return Inertia::render('approval/data-approval'
    //         ,[
    //             'data' =>new UserResourceCollection($asli)
    //         ]
    //     );
    // }
   
    public function __invoke(Request $request, UserApprovalPendingService $fetchPaginatedUsersUseCase): Response 
    {
        if($request->query('page') || $request->query('search') || $request->query()){
            if (!$request->ajax()) {
                    return abort(403,'Ga boleh mengakses apapun dari URL');
                }
            
            return abort(403,'Ga boleh mengakses apapun dari URL');
        };
        //untuk kebutuhan service, kita buth variable $filters dan $sortBy;
        // $filters = [];
        // $sortBy = [];

        // if($request->has('search')){
        //     $filters['search']= $request->query('search');
        // }

        // if($request->has('sort_by')){
        //     $sortBy['column']= $request->query('sort_by');
        //     $sortBy['direction']= $request->query('direction');
        // }

        // // $filters = [
        // //     'search' => $request->query('search'),
        // // ];

        // // $sortBy = [
        // //     'column' => $request->input('sort_by', 'created_at'),
        // //     'direction' => $request->input('sort_direction', 'asc'),
        // // ];

        // $perPage = $request->query('per_page',20);
        // $page = $request->query('page', 1);

        $asli = $fetchPaginatedUsersUseCase->execute(
            $request->query()
        );
        
        return Inertia::render('approval/data-approval'
            ,[
                'data' =>new UserResourceCollection($asli)
            ]
        );
    }

}
