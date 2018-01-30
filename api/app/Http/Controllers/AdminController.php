<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use OrchidEats\Models\User;
use OrchidEats\Models\Chefs;
use OrchidEats\Models\Orders;

class AdminController extends Controller
{
//    Get all the users. Add the rest of the details for the admin page on to the get request.
    public function userData() {
       $users = User::all();
       foreach ($users as $user) {
           $user->profile = User::find($user->id)->profile;
       }

       return response()->json([
           'status' => 'success',
           'data' => $users
        ]);
    }

//    Get all orders with User and Chef data involved.
    public function orderData() {
        $orders = Orders::all();
        foreach ($orders as $order) {
            $order->user = User::find($order->orders_user_id);
            $order->user_profile = User::find($order->orders_user_id)->profile;
            $order->chef = User::find($order->orders_chef_id);
            $order->chef_profile = User::find($order->orders_chef_id)->profile;
            $order->order_details = Orders::find($order->order_id)->order_details;
            $order->order_details->meal_details = json_decode($order->order_details->meal_details);
        }

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

//    Store the updated changes from the admin page
    public function updateUsers(Request $request) {
        $inputs = $request->all();

        foreach ($inputs as $input) {
            $data = User::find($input['id'])
            ->update(array('is_chef' => $input['is_chef']));
        }
        return response()->json([
            'status' => 'success',
            'message' => $data
        ]);
    }

    public function updateOrders(Request $request) {
        $inputs = $request->all();

        foreach ($inputs as $input) {
            $data = Orders::find($input['order_id'])
                ->update(array('completed' => $input['completed']));
        }
        return response()->json([
            'status' => 'success',
            'message' => $data
        ]);
    }


    public function destroy(Request $request)
    {
        $user = $request->all();
        User::destroy($user);

        return response()->json([
            'status' => 'User deleted successfully',
            'data' => $user
        ]);
    }
}
