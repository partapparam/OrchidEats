<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use DB;
use OrchidEats\Http\Resources\MarketplaceResource;
use OrchidEats\Models\Chef;
use OrchidEats\Models\Rating;
use OrchidEats\Models\User;
use OrchidEats\Models\Meal;

class MarketplaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $chefs = Chef::all();
        $data = array();

        foreach ($chefs as $chef) {
            $user = User::find($chef->chefs_user_id);
            if ($chef->meals()->avg('price') > 0 &&  $user->stripe_user_id != null) {
                /* Remember to use resource class! */
                array_push($data, new MarketplaceResource($user));
            }
        }
        /*$data = array();

        foreach ($chefs as $chef) {
            $user = $chef->user;
            $rating = $chef->ratings()->avg('rating');
            $price = $chef->meals()->avg('price');
            $diets = $chef->diets;
            $chef->rating = $rating;
            $chef->diets = $diets;
            $chef->first_name = $user->first_name;
            $chef->last_name = $user->last_name;
            $chef->price = $price;
            if ($chef->price > 0 && $user->stripe_user_id != null) {
                array_push($data, $chef);
            }
        }*/

        return response()->json([
            'status' => 'success',
            'data' => $data //array_filter($data, function($value) { return $value !== ''; })
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): JsonResponse
    {
        $chef = Chef::find($id);
        $data = array();

            $user = User::find($chef->chefs_user_id);
            $rating = $chef->ratings()->avg('rating');
            $reviews = $chef->ratings()->orderBy('created_at', 'desc')->get();
            $diets = $chef->diets;
            $meals = $chef->meals()->where('current_menu', '=', '1')->get();
            $chef->rating = $rating;
            $chef->diets = $diets;
            $chef->first_name = $user->first_name;
            $chef->last_name = $user->last_name;
            $chef->bio = $user->profile->bio;
            $chef->meals = $meals;
            $chef->reviews = $reviews;
            array_push($data, $chef);


        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
