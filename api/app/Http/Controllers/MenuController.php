<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use JWTAuth;
use JWTFactory;
use OrchidEats\Http\Requests\SubmitMenuRequest;
use OrchidEats\Http\Requests\UpdateMenuRequest;
use OrchidEats\Models\Meal;
use OrchidEats\Models\Chef;
use OrchidEats\Models\User;

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SubmitMenuRequest $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = User::find($user->id)->chef;
        $meal = Chef::find($chef->chef_id)->meals()->create(array(
            'name' => $request->name,
            'type' => $request->type,
            'description' => $request->description,
            'price' => $request->price,
            'current_menu' => $request->current_menu,
            'photo' => 'url to picture'
        ));

        if ($meal) {
            return response()->json([
                'status' => 'success',
                'data' => $meal
            ], 201);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Save unsuccessful, please re-submit'
            ],201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function current($id): JsonResponse
    {
        $chef = User::find($id)->chef;
        $meals = Chef::find($chef->chef_id)->meals()->where('current_menu', '=', '1')->get();

        if ($meals) {
            return response()->json([
                'status' => 'success',
                'data' => $meals,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Menu data not found'
            ], 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function past($id): JsonResponse
    {
        $chef = User::find($id)->chef;
        $meals = Chef::find($chef->chef_id)->meals()->orderBy('created_at','desc')->get();

        if ($meals) {
            return response()->json([
                'status' => 'success',
                'data' => $meals,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Menu data not found'
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id): JsonResponse
    {
        $meal = Meal::find($id);

        if ($meal) {
            return response()->json([
                'status' => 'success',
                'data' => $meal,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Menu data not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMenuRequest $request): JsonResponse
    {
        $meals = $request->all();

        foreach ($meals as $meal) {
            Meal::find($meal['meal_id'])->update(array(
                    'current_menu' => $meal['current_menu']
                ));
        }

            return response()->json([
                'status' => 'success',
                'message' => 'Update successful'
            ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request): JsonResponse
    {
        $meal = $request->all();
        $meals = Meal::destroy($meal);

        if ($meals) {
            return response()->json([
                'status' => 'success',
                'message' => 'Meal deleted'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unsuccessful, please try again'
            ], 200);
        }
    }
}
