<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user) {
            DB::table('users as u')
                ->join('profiles as p', 'u.id', 'p.profiles_user_id')
                ->where('id', '=', $user->id)->update(array(
                'u.first_name' => $request->first_name,
                'u.last_name' => $request->last_name,
                'u.email' => $request->email,
                'p.gender' => $request->gender,
                'p.dob' => $request->dob,
                'p.phone' => $request->phone,
                'p.address' => $request->address,
                'p.zip' => $request->zip,
                'p.bio' => $request->bio
            ));

            return response()->json([
                'status' => 'success',
                'message' => 'Update successful',
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Update unsuccessful',
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = JWTAuth::parseToken()->authenticate();

        $data = DB::table('users as u')
            ->join('profiles as p', 'u.id', 'p.profiles_user_id')
            ->where('id', '=', $user->id)
            ->select('p.gender', 'p.dob', 'p.phone', 'p.address', 'p.zip', 'p.bio', 'u.first_name', 'u.last_name', 'u.email')
            ->get();

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
