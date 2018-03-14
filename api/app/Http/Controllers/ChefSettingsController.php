<?php
/**
 * Created by PhpStorm.
 * User: paramsingh
 * Date: 3/9/18
 * Time: 3:35 PM
 */

namespace OrchidEats\Http\Controllers;
use Illuminate\Http\JsonResponse;
use JWTAuth;
use OrchidEats\Http\Requests\ChefSettingsRequest;
use OrchidEats\Models\User;


class ChefSettingsController extends Controller
{
//    Get order requirements for each chef from chefs table
    public function get(): JsonResponse {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = $user->chef;
        $chef->diets = $user->chef->diets;

        if ($chef) {
            return response()->json([
                'status' => 'success',
                'data' => $chef,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User data not found'
            ], 404);
        }
    }

//    Update Order Requirements
    public function post(ChefSettingsRequest $request): JsonResponse {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = $user->chef;

        $reqs = $chef->update(array(
            'food_handler' => $request->food_handler,
            'order_deadline' => $request->order_deadline,
            'min_per_order' => $request->min_per_order,
            'weekly_order_limit' => $request->weekly_order_limit,
            'delivery' => $request->delivery,
            'delivery_fee' => $request->delivery_fee,
            'pickup' => $request->pickup,
            'pickup_pickup' => $request->pickup_pickup,
            'delivery_info' => $request->delivery_info,
            'pickup_info' => $request->pickup_info,
            'delivery_date' => $request->delivery_date,
            'pickup_date' => $request->pickup_date
        ));

        $chef->diets()->update(array(
            'keto' => $request->diets['keto'] ?? 0,
            'paleo' => $request->diets['paleo'] ?? 0,
            'high_fat' => $request->diets['high_fat'] ?? 0,
            'low_carb' => $request->diets['low_carb'] ?? 0,
            'high_protein' => $request->diets['high_protein'] ?? 0,
            'vegan' => $request->diets['vegan'] ?? 0,
            'vegetarian' => $request->diets['vegetarian'] ?? 0
        ));

        if ($reqs) {
            return response()->json([
                'status' => 'success',
                'data' => $reqs,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unsuccessful, please re-submit'
            ], 404);
        }
    }

}