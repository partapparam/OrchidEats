<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use OrchidEats\Models\Chefs;
use OrchidEats\Models\Ratings;
use OrchidEats\Models\User;
use OrchidEats\Models\Meals;

class MarketplaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chefs = Chefs::all();
        $data = array();

        foreach ($chefs as $chef) {
            $user = User::find($chef->chef_id);
            $rating = Chefs::find($chef->chef_id)->ratings()->avg('rating');
            $price = Chefs::find($chef->chef_id)->meals()->avg('price');
            $chef->rating = $rating;
            $chef->first_name = $user->first_name;
            $chef->last_name = $user->last_name;
            $chef->price = $price;
            array_push($data, $chef);
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
    public function show($id)
    {
        $chef = Chefs::find($id);
        $data = array();

            $user = User::find($chef->chef_id);
            $rating = Chefs::find($chef->chef_id)->ratings()->avg('rating');
            $meals = Chefs::find($chef->chef_id)->meals()->where('current_menu', '=', '1')->get();
            $chef->rating = $rating;
            $chef->first_name = $user->first_name;
            $chef->last_name = $user->last_name;
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
