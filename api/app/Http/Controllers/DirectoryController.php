<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use DB;
use OrchidEats\Http\Resources\DirectoryResource;
use OrchidEats\Models\Chef;
use OrchidEats\Models\Rating;
use OrchidEats\Models\User;
use OrchidEats\Models\Meal;
use Carbon\Carbon;

class DirectoryController extends Controller
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
            if ($user->approved === 1) {
                /* Remember to use resource class! */
                array_push($data, new DirectoryResource($user));
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
        $order_rule = array();
        $expired = true;
        $date = Carbon::now()->timestamp;

        $chef = $user->chef;
        $rating = $chef->ratings()->avg('rating');
        $chef->diets;
        $meals = $chef->meals()->where('current_menu', '=', '1')->get();
        $chef->galleries;
        $expiration = Carbon::parse($chef->order_deadline)->timestamp;
            array_push($order_rule, json_decode($chef->bundle1));
            array_push($order_rule, json_decode($chef->bundle2));
            array_push($order_rule, json_decode($chef->bundle3));
            array_push($order_rule, json_decode($chef->bundle4));
        $chef->order_rule = $order_rule;
        $chef->rating = $rating;
        $chef->photo = $user->profile->photo;
        $chef->first_name = $user->first_name;
        $chef->meals = $meals;

        if ($expiration > $date) {
            $expired = false;
        }
        $chef->expired = $expired;
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
