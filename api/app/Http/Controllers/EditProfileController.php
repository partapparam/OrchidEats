<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OrchidEats\Http\Requests\UpdateProfileRequest;
use OrchidEats\Http\Resources\ProfileReource;
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

        $user->update([
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name
        ]);

        /* NOTE: Watch the 'firstOrNew' method! More info: https://laravel.com/docs/5.5/eloquent */
        $profile = $user->profile()->firstOrNew([
            'gender' => $request->gender,
            'dob' => $request->dob,
            'phone' => $request->phone,
            'address' => $request->address,
            'zip' => $request->zip,
            'bio' => $request->bio,
            'prof_pic' => '',
        ]);
        $profile->save();

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

        /* FIX: You don't need to write the following big query, laravel does this for you. It's called relationship.
        REMEMBER: MySQL is a relational Database.
        The relationship has already been defined in User.php from line 51 to 59.
        Read more here: https://laravel.com/docs/5.5/eloquent-relationships.
        Also read about laravel resource https://laravel.com/docs/5.5/eloquent-resources.
        Laravel resource helps how you want to represent your data to users. */
        /*$data = DB::table('users as u')
            ->join('profiles as p', 'u.id', 'p.profiles_user_id')
            ->where('id', '=', $user->id)
            ->select('p.gender', 'p.dob', 'p.phone', 'p.address', 'p.zip', 'p.bio', 'u.first_name', 'u.last_name', 'u.email')
            ->get();*/

        $data = new ProfileReource($user);

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
