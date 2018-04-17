<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OrchidEats\Http\Requests\SavePhotoRequest;
use OrchidEats\Models\Gallery;
use OrchidEats\Models\User;
use OrchidEats\Models\Chef;
use JWTAuth;


class GalleryController extends Controller
{
    public function get($id): JsonResponse
    {
        $creds = array();
        if ($user = JWTAuth::getToken()) {
            array_push($creds, env('MEAL_AWS_ACCESS_KEY_ID'));
            array_push($creds, env('MEAL_AWS_SECRET_ACCESS_KEY'));
            return response()->json([
                'status' => 'success',
                'data' => $creds
            ]);
        } else {
            $creds = null;
        }
        $user = User::find($id);

        $data = $user->chef->galleries;
        $count = $user->chef->galleries()->count();

        if ($data) {
            return response()->json([
                'status' => 'success',
                'data' => [$data, $creds, $count]
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }

    public function addPhoto (SavePhotoRequest $request) {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = $user->chef;
        $photo = $chef->galleries()->create(array(
            'url' => (env('MEAL_LINK')) . $request->url
        ));

        if ($photo) {
            return response()->json([
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }

    }

    public function delete(Request $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $photo = Gallery::find($request->photo_id);

        if ($user->chef->chef_id === $photo->galleries_chef_id) {
            Gallery::destroy($request->photo_id);
            return response()->json([
                'status' => 'success',
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unsuccessful, please try again'
            ], 200);
        }
    }
}
