<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use JWTAuth;
use Carbon\Carbon;
use OrchidEats\Http\Requests\SubmitMealRequest;
use OrchidEats\Models\Meal;
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
    public function store(SubmitMealRequest $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = User::find($user->id)->chef;
//        if no photo, set default
        if ($request->photo == null) {
            $request->photo = env('DEFAULT_MEAL');
        }

        if ($request->meal_id) {
            $meal = Meal::find($request->meal_id)->update(array(
                'name' => $request->name,
                'type' => $request->type,
                'description' => $request->description,
                'price' => $request->price,
                'current_menu' => $request->current_menu,
                'photo' => (env('MEAL_LINK')) . $request->photo
            ));
        } else {
            $meal = $chef->meals()->create(array(
                'name' => $request->name,
                'type' => $request->type,
                'description' => $request->description,
                'price' => $request->price,
                'current_menu' => $request->current_menu,
                'photo' => (env('MEAL_LINK')) . $request->photo
            ));
        }

        if ($meal) {
//            updates chef profile so we can arrange marketplace with orderBy
            $chef->update(array(
                'updated_at' => Carbon::now(),
            ));

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
