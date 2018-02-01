<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use JWTAuth;
use OrchidEats\Models\Chefs;
use OrchidEats\Models\Orders;
use OrchidEats\Models\OrdersDetails;
use OrchidEats\Models\User;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

//        use this to show all orders in the admin page
//        $user = User::find
//        $data = array();
//
//        foreach ($chefs as $chef) {
//            $user = User::find($chef->chef_id);
//            $rating = Chefs::find($chef->chef_id)->ratings()->avg('rating');
//            $price = Chefs::find($chef->chef_id)->meals()->avg('price');
//            $chef->rating = $rating;
//            $chef->first_name = $user->first_name;
//            $chef->last_name = $user->last_name;
//            $chef->price = $price;
//            array_push($data, $chef);
//        }
//
//        return response()->json([
//            'status' => 'success',
//            'data' => $data
//        ]);
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
    public function past()
    {
        $token = JWTAuth::parseToken()->authenticate();
        $user = User::find($token->id);
        $data = array();

        $orders = User::find($token->id)->orders()->where('completed', '=', '1')->get();
        foreach ($orders as $order) {
            $chef = User::find($order->orders_chef_id);
            $chef_profile = User::find($order->orders_chef_id)->profile;
            $order_details = Orders::find($order->order_id)->order_details;
            $order->chef_first_name = $chef->first_name;
            $order->chef_last_name = $chef->last_name;
            $order->chef_email = $chef->email;
            $order->chef_phone = $chef_profile->phone;
            $order->delivery_date = $order_details->delivery_date;
            $order->meal_details = json_decode($order_details->meal_details);
            $order->delivery_window = $order_details->delivery_window;
        }
        array_push($data, $orders);

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }

    public function upcoming()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data = array();

        $orders = User::find($user->id)->orders()->where('completed', '=', '0')->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
            $chef = User::find($order->orders_chef_id);
            $chef_profile = User::find($order->orders_chef_id)->profile;
            $order_details = Orders::find($order->order_id)->order_details;
            $order->chef_first_name = $chef->first_name;
            $order->chef_last_name = $chef->last_name;
            $order->chef_email = $chef->email;
            $order->chef_phone = $chef_profile->phone;
            $order->delivery_date = $order_details->delivery_date;
            $order->meal_details = json_decode($order_details->meal_details);
            $order->delivery_window = $order_details->delivery_window;
        }
        array_push($data, $orders);

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }

    public function orderHistory()
    {
        $chef = JWTAuth::parseToken()->authenticate();
        $data = array();

        $orders = Chefs::find($chef->id)->orders()->orderBy('created_at', 'desc')->get();
        foreach ($orders as $order) {
            $user = User::find($order->orders_user_id);
            $user_profile = User::find($order->orders_user_id)->profile;
            $order_details = Orders::find($order->order_id)->order_details;
            $order->user_first_name = $user->first_name;
            $order->user_last_name = $user->last_name;
            $order->user_email = $user->email;
            $order->user_phone = $user_profile->phone;
            $order->delivery_date = $order_details->delivery_date;
            $order->meal_details = json_decode($order_details->meal_details);
            $order->delivery_window = $order_details->delivery_window;
        }
        array_push($data, $orders);

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }

    public function incompleteOrders()
    {
        $chef = JWTAuth::parseToken()->authenticate();
        $data = array();

        $orders = Chefs::find($chef->id)->orders()->where('completed', '=', '0')->get();
        foreach ($orders as $order) {
            $user = User::find($order->orders_user_id);
            $user_profile = User::find($order->orders_user_id)->profile;
            $order_details = Orders::find($order->order_id)->order_details;
            $order->user_first_name = $user->first_name;
            $order->user_last_name = $user->last_name;
            $order->user_email = $user->email;
            $order->user_phone = $user_profile->phone;
            $order->delivery_date = $order_details->delivery_date;
            $order->meal_details = json_decode($order_details->meal_details);
            $order->delivery_window = $order_details->delivery_window;
        }
        array_push($data, $orders);

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
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
