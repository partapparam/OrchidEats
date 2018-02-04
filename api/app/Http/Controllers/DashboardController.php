<?php

namespace OrchidEats\Http\Controllers;


use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OrchidEats\Http\Resources\DashboardResource;
use JWTAuth;

class DashboardController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data = new DashboardResource($user);

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);

    }
}
