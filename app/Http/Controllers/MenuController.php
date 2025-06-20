<?php

namespace App\Http\Controllers;

use App\Peran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        return Inertia::render('menu',[
            'permission' => Auth::user()->getAllPermissions()->pluck('name')->toArray()
        ]);
    }
}
