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

        if ($request->meal_id) {
            $meal = Meal::find($request->meal_id)->update(array(
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'current_menu' => $request->current_menu,
            ));
        } else {
            $meal = $chef->meals()->create(array(
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'current_menu' => $request->current_menu,
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

        if ($meal) {
            return response()->json([
                'status' => 'success',
                'data' => $meal
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Menu data not found'
            ], 404);
        }
    }
}
