<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use OrchidEats\Http\Requests\ProfilePhotoRequest;
use OrchidEats\Http\Resources\ProfileResource;
use OrchidEats\Http\Requests\SubmitReviewRequest;
use OrchidEats\Http\Requests\ChefSettingsRequest;
use OrchidEats\Models\Order;
use OrchidEats\Models\User;
use OrchidEats\Models\Chef;
use Psy\Util\Json;

class ProfileController extends Controller
{
    /**
     * Handle profile request.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile($id):JsonResponse
    {
        $user = User::find($id);
        if ($user->is_chef === 1) {
            $menu = $user->chef->meals()->where('current_menu', '=', 1)->get()->count();
        } else {
            $menu = 0;
        }
        $profile = new ProfileResource($user);

        if ($profile) {
            return response()->json([
                'status' => 'success',
                'data' => [$profile, $menu]
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User data not found'
            ], 404);
        }
    }

    public function reviews($id):JsonResponse
    {
        $chef = User::find($id)->chef;
        $ratings = $chef->ratings;
        $data = array();

        foreach ($ratings as $rating) {
            $user = User::find($rating->ratings_user_id);
            $rating->leftBy = $user;
            $rating->profile= $user->profile->photo;
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

    public function updatePhoto(ProfilePhotoRequest $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $photo = $user->profile()->update(array(
            'photo' => (env('PROFILE_LINK')) . $request->photo ?? null
        ));

        if ($photo) {
            return response()->json([
                'status' => 'success',
                'data' => $request->photo
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }

    public function photo (): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $photo = $user->profile->photo;
        $creds = array();
        array_push($creds, env('PROFILE_AWS_ACCESS_KEY_ID'));
        array_push($creds, env('PROFILE_AWS_SECRET_ACCESS_KEY'));

        if ($user) {
            return response()->json([
                'status' => 'success',
                'data' => [$creds, $photo]
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }
}
