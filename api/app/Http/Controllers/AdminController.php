<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use OrchidEats\Http\Requests\AdminUpdateRequest;
use OrchidEats\Http\Requests\AdminUserRequest;
use OrchidEats\Http\Requests\AdminOrderRequest;
use Illuminate\Http\JsonResponse;
use OrchidEats\Http\Requests\CancelOrderRequest;
use OrchidEats\Models\User;
use OrchidEats\Models\Chef;
use OrchidEats\Models\Order;

class AdminController extends Controller
{
//    Get all the users. Add the rest of the details for the admin page on to the get request.
    public function userData(): JsonResponse
    {
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
    public function orderData(): JsonResponse
    {
        $orders = Order::all();
        foreach ($orders as $order) {
            $order->user = User::find($order->orders_user_id) ?? null;
            $order->user_profile = User::find($order->orders_user_id)->profile ?? null;
            $order->chef = User::find($order->orders_chef_id) ?? null;
            $order->chef_profile = User::find($order->orders_chef_id)->profile ?? null;
            $order->order_details = Order::find($order->order_id)->order_details;
            $order->order_details->meal_details = json_decode($order->order_details->meal_details);
        }

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

//    Store the updated changes from the admin page
    public function updateUsers(AdminUserRequest $request): JsonResponse
    {
        $inputs = $request->all();

        foreach ($inputs as $input) {
            User::find($input['id'])
            ->update(array('is_chef' => $input['is_chef']));
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Update is successful'
        ]);
    }

    //    Store the updated changes from the admin page
    public function updateAdmin(AdminUpdateRequest $request): JsonResponse
    {
        $inputs = $request->all();

        foreach ($inputs as $input) {
            User::find($input['id'])
                ->update(array('is_admin' => $input['is_admin']));
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Updated'
        ]);
    }

    public function updateOrders(AdminOrderRequest $request): JsonResponse
    {
        $inputs = $request->all();

        foreach ($inputs as $input) {
            Order::find($input['order_id'])
                ->update(array('completed' => $input['completed']));
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Orders updated'
        ]);
    }


    public function destroy(Request $request): JsonResponse
    {
        $user = $request->all();
        User::destroy($user);

        return response()->json([
            'status' => 'User deleted successfully',
            'data' => $user
        ]);
    }

    public function cancel(CancelOrderRequest $request): JsonResponse
    {

        Order::find($request->order_id)->update(array(
            'completed' => '2',
//            'orders_chef_id' => null
        ));

        return response()->json([
            'status' => 'success',
        ], 201);
    }
}
