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
            $chefs = Chef::find($order->orders_chef_id);
//            Get chefs user data from users table
            $chef = User::find($chefs->chefs_user_id);
            $chef_profile = User::find($chef->id)->profile;
            $order_details = Order::find($order->order_id)->order_details;
            $order->chef_first_name = $chef->first_name;
            $order->chef_last_name = $chef->last_name;
            $order->chef_email = $chef->email;
            $order->chef_phone = $chef_profile->phone;
            $order->delivery_date = $order_details->delivery_date;
            $order->meal_details = json_decode($order_details->meal_details);
            $order->delivery_window = $order_details->delivery_window;
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
            $chef = User::find($order->orders_chef_id);
            $chef_profile = User::find($order->orders_chef_id)->profile;
            $order_details = Order::find($order->order_id)->order_details;
            $order->chef_first_name = $chef->first_name;
            $order->chef_last_name = $chef->last_name;
            $order->chef_email = $chef->email;
            $order->chef_phone = $chef_profile->phone;
            $order->delivery_date = $order_details->delivery_date;
            $order->meal_details = json_decode($order_details->meal_details);
            $order->delivery_window = $order_details->delivery_window;
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

    public function orderHistory(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = User::find($user->id)->chef;
        $data = array();

        $orders = Chef::find($chef->chef_id)->orders()->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
            $user = User::find($order->orders_user_id);
            $user_profile = User::find($order->orders_user_id)->profile;
            $order_details = Order::find($order->order_id)->order_details;
            $order->user_first_name = $user->first_name;
            $order->user_last_name = $user->last_name;
            $order->user_email = $user->email;
            $order->user_phone = $user_profile->phone;
            $order->delivery_date = $order_details->delivery_date;
            $order->meal_details = json_decode($order_details->meal_details);
            $order->delivery_window = $order_details->delivery_window;
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

    public function incompleteOrders(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = User::find($user->id)->chef;
        $data = array();

        $orders = Chef::find($chef->chef_id)->orders()->where('completed', '=', '0')->get();
        foreach ($orders as $order) {
            $user = User::find($order->orders_user_id);
            $user_profile = User::find($order->orders_user_id)->profile;
            $order_details = Order::find($order->order_id)->order_details;
            $order->user_first_name = $user->first_name;
            $order->user_last_name = $user->last_name;
            $order->user_email = $user->email;
            $order->user_phone = $user_profile->phone;
            $order->delivery_date = $order_details->delivery_date;
            $order->meal_details = json_decode($order_details->meal_details);
            $order->delivery_window = $order_details->delivery_window;
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
