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
        $chefs = Chef::orderBy('updated_at', 'desc')->get();
        $data = array();

        foreach ($chefs as $chef) {
            $user = User::find($chef->chefs_user_id);
            if ($chef->meals()->avg('price') > 0 &&  $user->stripe_user_id != null && $user->approved === 1) {
                /* Remember to use resource class! */
                array_push($data, new MarketplaceResource($user));
            }
        }

        return response()->json([
            'status' => 'success',
            'data' => $data
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
        $user = User::find($id);
        $data = array();

            $chef = $user->chef;
            $rating = $chef->ratings()->avg('rating');
            $diets = $chef->diets;
            $meals = $chef->meals()->where('current_menu', '=', '1')->get();
            $chef->rating = $rating;
            $chef->photo = $user->profile->photo;
            $chef->diets = $diets;
            $chef->first_name = $user->first_name;
            $chef->last_name = $user->last_name;
            $chef->bio = $user->profile->bio;
            $chef->meals = $meals;
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
