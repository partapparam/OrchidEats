<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use DB;

class AccountNotificationsController extends Controller
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
            DB::table('profiles as p')
                ->where('user_id', '=', $user->id)->update(array(
                'p.email_note' => $request->email_note,
                'p.text_note' => $request->text_note
            ));
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Update successful',
        ], 200);
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

        $data = DB::table('profiles as p')
            ->where('user_id', '=', $user->id)
            ->select('p.email_note', 'p.text_note')
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
