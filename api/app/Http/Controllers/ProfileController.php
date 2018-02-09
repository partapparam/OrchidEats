<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use OrchidEats\Http\Resources\ProfileResource;
use OrchidEats\Http\Requests\SubmitReviewRequest;
use OrchidEats\Http\Requests\OrderReqsRequest;
use OrchidEats\Models\Order;
use OrchidEats\Models\User;
use OrchidEats\Models\Chef;

class ProfileController extends Controller
{
    /**
     * Handle profile request.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile($id)
    {
        $user = User::find($id);
        $profile = new ProfileResource($user);

        if ($profile) {
            return response()->json([
                'status' => 'success',
                'data' => $profile,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User data not found'
            ], 404);
        }
    }

    public function reviews($id)
    {
        $chef = User::find($id)->chef;
        $ratings = $chef->ratings;
        $data = array();

        foreach ($ratings as $rating) {
            $rating->leftBy = User::find($rating->ratings_user_id);
            array_push($data, $rating);
        }

        if ($ratings) {
            return response()->json([
                'status' => 'success',
                'data' => $ratings,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User reviews not found'
            ], 404);
        }
    }

    public function submitReview (SubmitReviewRequest $request): JsonResponse {
        $order = Order::find($request->order_id);
        $true = false;
        if ($order) {
            $true = $order->ratings()->updateOrCreate(array (   'ratings_order_id' => $request->order_id),
                array(
                'rating' => $request->rating,
                'chef_feedback' => $request->chef_feedback,
                'body' => $request->body,
                'ratings_chef_id' => $order->orders_chef_id,
                'ratings_user_id' => $order->orders_user_id,
            ));
        }
        if ($true) {
            $order->update(array(
                'reviewed' => 1
            ));
                return response()->json([
                    'status' => 'success',
                    'message' => 'Review saved'
                ], 201);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unsuccessful, please re-submit'
                ]);
        }
    }

//    Get order requirements for each chef from chefs table
    public function orderReqs(): JsonResponse {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = User::find($user->id)->chef;
        $chef->diets = Chef::find($chef->chef_id)->diets;

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
    public function updateOrderReqs(OrderReqsRequest $request): JsonResponse {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = User::find($user->id)->chef;

        $reqs = $chef->update(array(
            'food_handler' => $request->food_handler,
            'order_deadline' => $request->order_deadline,
            'min_per_order' => $request->min_per_order,
            'oe_delivery' => $request->oe_delivery,
            'weekly_order_limit' => $request->weekly_order_limit,
            'pickup' => $request->pickup,
            'delivery_window' => $request->delivery_window,
            'delivery_date' => $request->delivery_date
        ));

        $diet = $chef->diets()->update(array(
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
