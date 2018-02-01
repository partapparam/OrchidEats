<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use DB;
use OrchidEats\Models\Meals;
use OrchidEats\Models\Chefs;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $chef = JWTAuth::parseToken()->authenticate();
        $meal = Chefs::find($chef->id)->meals()->create(array(
            'name' => $request->name,
            'type' => $request->type,
            'description' => $request->description,
            'price' => $request->price,
            'current_menu' => 1,
            'photo' => 'url to picture'
        ));


        return response()->json([
            'status' => 'success',
            'data' => $meal
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function current()
    {
        $chef = JWTAuth::parseToken()->authenticate();
        $meals = Chefs::find($chef->id)->meals()->where('current_menu', '=', '1')->get();

        return response()->json([
            'status' => 'success',
            'data' => $meals
        ]);
    }

    public function past()
    {
        $chef = JWTAuth::parseToken()->authenticate();
        $meals = Chefs::find($chef->id)->meals()->orderBy('created_at','desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $meals
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $meals = $request->all();

        foreach ($meals as $meal) {
            $meal = Meals::find($meal['meal_id'])->update(array(
                    'current_menu' => $meal['current_menu']
                ));

        }
            return response()->json([
                'status' => 'success',
                'data' => $meal
            ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $meal = $request->all();
        $meals = Meals::destroy($meal);

        return response()->json([
            'status' => 'Meal deleted successfully',
            'data' => $meals
        ]);
    }
}
