<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OrchidEats\Http\Requests\UpdateProfileRequest;
use OrchidEats\Http\Resources\ProfileResource;
use OrchidEats\Models\Profile;
use OrchidEats\Models\User;
use JWTAuth;
use JWTFactory;
use DB;
use Tymon\JWTAuth\Exceptions\JWTException;

class EditProfileController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpdateProfileRequest $request (This is the form validation class. Hover the class & ⌘ + click to view the file.)
     * @return JsonResponse
     */
    public function store(UpdateProfileRequest $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();

        $user->update(array(
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name
        ));

        /* NOTE: Watch the 'firstOrNew' method! More info: https://laravel.com/docs/5.5/eloquent */
        $user->profile()->update(array(
            'gender' => null,
            'dob' => $request->dob,
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip' => $request->zip,
            'bio' => $request->bio,
        ));

        return response()->json([
            'status' => 'success',
            'message' => 'Update successful',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @return JsonResponse
     */
    public function show(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();

        $data = new ProfileResource($user);

        return response()->json([
            'status' => 'success',
            'data' => $data,
        ], 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
