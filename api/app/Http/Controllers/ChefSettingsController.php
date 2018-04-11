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
        $chef->bundle1 = json_decode($chef->bundle1);
        $chef->bundle2 = json_decode($chef->bundle2);
        $chef->bundle3 = json_decode($chef->bundle3);
        $chef->bundle4 = json_decode($chef->bundle4);
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
            'bundle1' => json_encode($request->bundle1),
            'bundle2' => json_encode($request->bundle2),
            'bundle3' => json_encode($request->bundle3),
            'bundle4' => json_encode($request->bundle4),
            'delivery' => $request->delivery,
            'delivery_fee' => $request->delivery_fee,
            'pickup' => $request->pickup,
            'pickup_pickup' => $request->pickup_pickup,
            'delivery_info' => $request->delivery_info,
            'pickup_info' => $request->pickup_info,
            'delivery_date' => $request->delivery_date,
            'pickup_date' => $request->pickup_date,
            'payment_options' => $request->payment_options
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