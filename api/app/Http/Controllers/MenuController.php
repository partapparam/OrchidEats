<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use JWTAuth;
use Carbon\Carbon;
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
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */


    /**
     * Display the specified resource.
     *
     * @param  int $id
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
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function past($id): JsonResponse
    {
        $chef = User::find($id)->chef;
        $meals = $chef->meals()->orderBy('created_at', 'desc')->get();

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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMenuRequest $request): JsonResponse
    {
        $meals = $request->all();
        $user = JWTAuth::parseToken()->authenticate();

        foreach ($meals as $meal) {
            Meal::find($meal['meal_id'])->update(array(
                'current_menu' => $meal['current_menu']
            ));
        }

//        updates chef profile so we can arrange marketplace with orderBy
        $user->chef()->update(array(
            'updated_at' => Carbon::now(),
        ));

        return response()->json([
            'status' => 'success',
            'message' => 'Update successful'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = User::find($user->id)->chef->chef_id;
        $input = $request->all();
        $meal = Meal::find($request);

        if ($chef === $meal[0]->meals_chef_id) {
            Meal::destroy($input);

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
