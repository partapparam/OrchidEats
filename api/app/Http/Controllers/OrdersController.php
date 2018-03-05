<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use JWTAuth;
use OrchidEats\Models\Chef;
use OrchidEats\Models\Order;
use OrchidEats\Models\User;
use Psy\Util\Json;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function past(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data = array();

        $orders = User::find($user->id)->orders()->where('completed', '=', '1')->get();
        foreach ($orders as $order) {
//            finds chef table, gets chefs_user_id
            $chef = Chef::find($order->orders_chef_id)->user;
            $order->chef_profile = $chef->profile;
            $order->chef_first_name = $chef->first_name;
            $order->chef_last_name = $chef->last_name;
            $order->chef_email = $chef->email;
            $order->meal_details = json_decode($order->meal_details);
        }
        array_push($data, $orders);

        if ($data) {
            return response()->json([
                'status' => 'success',
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Order data not found'
            ], 404);
        }
    }

    public function upcoming(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data = array();

        $orders = User::find($user->id)->orders()->where('completed', '=', '0')->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
            $chef = Chef::find($order->orders_chef_id)->user;
            $order->chef_profile = $chef->profile;
            $order->chef_first_name = $chef->first_name;
            $order->chef_last_name = $chef->last_name;
            $order->chef_email = $chef->email;
            $order->meal_details = json_decode($order->meal_details);
        }
        array_push($data, $orders);

        if ($data) {
            return response()->json([
                'status' => 'success',
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Order data not found'
            ], 404);
        }
    }

//    chefs order history
    public function orderHistory(): JsonResponse
    {
        $token = JWTAuth::parseToken()->authenticate();
        $chef = User::find($token->id)->chef;
        $data = array();

        $orders = $chef->orders()->where('completed', '=', '1')->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
            $user = User::find($order->orders_user_id);
            $order->user_profile = $user->profile;
            $order->user_first_name = $user->first_name;
            $order->user_last_name = $user->last_name;
            $order->user_email = $user->email;
            $order->meal_details = json_decode($order->meal_details);
        }
        array_push($data, $orders);

        if ($data) {
            return response()->json([
                'status' => 'success',
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Order data not found'
            ], 404);
        }
    }
//chefs current orders
    public function currentOrders(): JsonResponse
    {
        $token = JWTAuth::parseToken()->authenticate();
        $chef = User::find($token->id)->chef;
        $data = array();

        $orders = $chef->orders()->where('completed', '=', '0')->get();
        foreach ($orders as $order) {
            $user = User::find($order->orders_user_id);
            $order->user_profile = $user->profile;
            $order->user_first_name = $user->first_name;
            $order->user_last_name = $user->last_name;
            $order->user_email = $user->email;
            $order->meal_details = json_decode($order->meal_details);
        }
        array_push($data, $orders);

        if ($data) {
            return response()->json([
                'status' => 'success',
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Order data not found'
            ], 404);
        }
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
