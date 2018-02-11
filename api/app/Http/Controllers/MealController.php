<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use JWTAuth;
use JWTFactory;
use OrchidEats\Http\Requests\SubmitMenuRequest;
use OrchidEats\Models\Meal;
use OrchidEats\Models\Chef;
use OrchidEats\Models\User;

class MealController extends Controller
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
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(SubmitMenuRequest $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = User::find($user->id)->chef;
        if ($request->meal_id) {
            $meal = Meal::find($request->meal_id)->update(array(
                'name' => $request->name,
                'type' => $request->type,
                'description' => $request->description,
                'price' => $request->price,
                'current_menu' => $request->current_menu,
                'photo' => (env('MEAL_LINK')) . $request->photo ?? null
            ));
        } else {
            $meal = Chef::find($chef->chef_id)->meals()->create(array(
                'name' => $request->name,
                'type' => $request->type,
                'description' => $request->description,
                'price' => $request->price,
                'current_menu' => $request->current_menu,
                'photo' => (env('MEAL_LINK')) . $request->photo ?? null
            ));
        }

        if ($meal) {
            return response()->json([
                'status' => 'success',
                'data' => $meal
            ], 201);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Save unsuccessful, please re-submit'
            ], 201);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id): JsonResponse
    {
        $meal = Meal::find($id);
        $creds = array();
        array_push($creds, env('AWS_ACCESS_KEY_ID'));
        array_push($creds, env('AWS_SECRET_ACCESS_KEY'));

        if ($meal) {
            return response()->json([
                'status' => 'success',
                'data' => [$meal, $creds]
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Menu data not found'
            ], 404);
        }
    }

    public function photo(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
//        $photo = $user->profile->photo;
        $creds = array();
        array_push($creds, env('MEAL_AWS_ACCESS_KEY_ID'));
        array_push($creds, env('MEAL_AWS_SECRET_ACCESS_KEY'));

        if ($user) {
            return response()->json([
                'status' => 'success',
                'data' => $creds
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }
}
