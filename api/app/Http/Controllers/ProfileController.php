<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use DB;
use OrchidEats\Models\Profile;
use OrchidEats\Models\User;
use OrchidEats\Models\Chefs;

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
        $data = User::find($user->id);
        $profile = User::find($user->id)->profile;
        $profile->first_name = $data->first_name;
        $profile->last_name = $data->last_name;

        return response()->json([
            'status' => 'success',
            'data' => $profile,
        ], 200);
    }

    public function show() {
        $user = JWTAuth::parseToken()->authenticate();
        $data = DB::table('ratings as r')
            ->join('users as u', 'r.ratings_user_id', 'u.id')
            ->select('r.*', 'u.first_name', 'u.last_name')
            ->where('r.ratings_user_id', '=', $user->id)
            ->orWhere('r.ratings_chef_id', '=', 'u.id')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $data,
        ], 200);
    }

//    Get order requirements for each chef from chefs table
    public function orderReqs() {
        $user = JWTAuth::parseToken()->authenticate();
        $reqs = Chefs::find($user->id);

        return response()->json([
            'status' => 'success',
            'data' => $reqs
        ]);
    }

//    Update Order Requirements
    public function updateOrderReqs(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();

        $reqs = Chefs::find($user->id)->update(array(
            'food_handler' => $request->food_handler,
            'min_order' => $request->min_order,
            'oe_delivery' => $request->oe_delivery,
            'order_limit' => $request->order_limit,
            'pickup' => $request->pickup
        ));

        return response()->json([
            'status' => 'success',
            'data' => $reqs
        ]);
    }
}
