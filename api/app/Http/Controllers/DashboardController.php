<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use OrchidEats\Models\Profile;
use OrchidEats\Models\Stripe;
use OrchidEats\Models\Chefs;
use OrchidEats\Models\User;
use JWTAuth;

class DashboardController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = JWTAuth::parseToken()->authenticate();

        $chef = Chefs::find($user->id);
        $chef->ratingAvg = Chefs::find($chef->chef_id)->ratings()->avg('rating');
        $chef->ordersTotal = Chefs::find($chef->chef_id)->orders()->count();
        $chef->reviewsTotal = Chefs::find($chef->chef_id)->ratings()->count();
        $chef->revenueTotal = Chefs::find($chef->chef_id)->orders()->sum('order_total');
        $chef->yearlyRevenueTotal = Chefs::find($chef->chef_id)->orders()->whereYear('created_at', date('2018'))->sum('order_total');

        return response()->json([
            'status' => 'success',
            'data' => $chef
        ]);

    }
}
