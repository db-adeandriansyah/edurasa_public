<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAjaxShouldBeAccessed
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
       
        
        if (!$request->ajax()) {
            // return response()->json([
            //         'message' => 'This endpoint is only accessible via AJAX.',
            //     ], 403);
                return abort(403,'Ga boleh diakses kecuali dengan Ajax');
            }
        // if ($request->header('X-Requested-With') !== 'XMLHttpRequest') {
        //     // dd($request->header());
        //     abort(403, 'This endpoint is only accessible via AJAX.');
        // }
        return $next($request);
    }
}
