<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use JWTAuth;
use OrchidEats\Http\Resources\OrderResource;
use OrchidEats\Mail\OrderComplete;
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
    public function completed(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = $user->chef;
        $order = Order::find($request->order_id);

        if ($chef->chef_id === $order->orders_chef_id) {
            $order->update(array(
                'completed' => 1
            ));

            $data['email'] = $request->customer_details['email'];
            $data['order_id'] = $request->order_id;
            $data['chef'] = $user->first_name;
            $data['name'] = $request->customer_details['name'];
            $data['contact'] = $user->email;

            $url = env('APP_URL') . '/submit-review/order/' . $request->order_id . '?name=' . $data['name'];

            $data['url'] = $url;

            \Mail::to($data['email'])->send(new OrderComplete($data));


            return response()->json([
                'status' => 'success',
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }

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

        $orders = $user->orders()->where('completed', '=', '1')->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
//            finds chef table, gets chefs_user_id
            $chef = Chef::find($order->orders_chef_id)->user;
            $order->chef = new OrderResource($chef);
            $order->meal_details = json_decode($order->meal_details);
            $order->customer_details = json_decode($order->customer_details);
            $order->order_details = json_decode($order->order_details);
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

        $orders = $user->orders()->where('completed', '=', '0')->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
            $chef = Chef::find($order->orders_chef_id)->user;
            $order->chef = new OrderResource($chef);
            $order->meal_details = json_decode($order->meal_details);
            $order->customer_details = json_decode($order->customer_details);
            $order->order_details = json_decode($order->order_details);
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
            $user = User::find($order->orders_user_id) ?? null;
            if ($user != null) {
                $buyer = new OrderResource($user);
            } else {
                $buyer['photo'] = 'https://s3-us-west-1.amazonaws.com/orchideats.com/default-profile.png';
            }
            $order->buyer = $buyer;
            $order->meal_details = json_decode($order->meal_details);
            $order->customer_details = json_decode($order->customer_details);
            $order->order_details = json_decode($order->order_details);
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

        $orders = $chef->orders()->where('completed', '=', '0')->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
            $user = User::find($order->orders_user_id) ?? null;
            if ($user != null) {
                $buyer = new OrderResource($user);
            } else {
                $buyer['photo'] = 'https://s3-us-west-1.amazonaws.com/orchideats.com/default-profile.png';
            }
            $order->buyer = $buyer;
            $order->meal_details = json_decode($order->meal_details);
            $order->customer_details = json_decode($order->customer_details);
            $order->order_details = json_decode($order->order_details);
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
