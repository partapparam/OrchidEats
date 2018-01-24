<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use DB;
use OrchidEats\Models\Profile;
class ProfileController extends Controller
{
    /**
     * Handle profile request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data = DB::table('profiles')
            ->where('user_id', '=', $user->id)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $data,
        ], 200);
    }

    public function show() {
        $user = JWTAuth::parseToken()->authenticate();
        $data = DB::table('ratings as r')
            ->join('users as u', 'r.user_id', 'u.id')
            ->select('r.*', 'u.first_name', 'u.last_name')
            ->where('r.user_id', '=', $user->id)
            ->orWhere('r.chef_id', '=', 'u.id')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $data,
        ], 200);
    }
}