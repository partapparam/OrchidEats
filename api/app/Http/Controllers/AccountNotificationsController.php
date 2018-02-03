<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use JWTAuth;
use JWTFactory;
use OrchidEats\Http\Requests\AccountNotificationsRequest;
use OrchidEats\Models\User;

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
    public function store(AccountNotificationsRequest $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();

        $update = User::find($user->id)->profile()
                ->update(array(
                'email_note' => $request->email_note,
                'text_note' => $request->text_note
            ));

        if ($update) {
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
    public function show(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();

        $data = User::find($user->id)->profile()
            ->select('email_note', 'text_note')
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
