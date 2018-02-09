<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use OrchidEats\Http\Requests\AdminDeliveryRequest;
use OrchidEats\Http\Requests\AdminUpdateRequest;
use OrchidEats\Http\Requests\AdminUserRequest;
use OrchidEats\Http\Requests\AdminOrderRequest;
use Illuminate\Http\JsonResponse;
use OrchidEats\Http\Requests\CancelOrderRequest;
use OrchidEats\Models\User;
use OrchidEats\Models\Delivery;
use OrchidEats\Models\Order;
use OrchidEats\Models\Diet;
use JWTAuth;
use OrchidEats\Models\Chef;

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
            $order->meal_details = json_decode($order->meal_details);
        }

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

    public function deliveryData(): JsonResponse
    {
        $deliveries = Delivery::all();

        return response()->json([
            'status' => 'success',
            'data' => $deliveries
        ]);
    }

//    Store the updated changes from the admin page
    public function updateUsers(AdminUserRequest $request): JsonResponse
    {
        $admin = JWTAuth::parseToken()->authenticate();
        $inputs = $request->all();
        $is_admin = User::find($admin->id)->is_admin;


        if ($is_admin === 1) {
            foreach ($inputs as $input) {
                $success = User::find($input['id'])
                    ->update(array('is_chef' => $input['is_chef']));

//            find if chef already exists to prevent extra creation chef id
                $exists = User::find($input['id'])->chef ?? null;

//            if user is updated to chef, create new chef instance.
                if ($success && $input['is_chef'] === 1 && $exists == null) {
                    $chef = new Chef;
                    $chef->chefs_user_id = $input['id'];
                    $chef->save();
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Update is successful',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed. This is an admin action',
            ]);
        }
    }

    //    Store the updated changes from the admin page
    public function updateAdmin(AdminUpdateRequest $request): JsonResponse
    {
        $admin = JWTAuth::parseToken()->authenticate();
        $inputs = $request->all();
        $is_admin = User::find($admin->id)->is_admin;


        if ($is_admin === 1) {
            foreach ($inputs as $input) {
                User::find($input['id'])
                    ->update(array('is_admin' => $input['is_admin']));
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Update is successful',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed. This is an admin action',
            ]);
        }
    }

    public function updateOrders(AdminOrderRequest $request): JsonResponse
    {
        $admin = JWTAuth::parseToken()->authenticate();
        $inputs = $request->all();
        $is_admin = User::find($admin->id)->is_admin;


        if ($is_admin === 1) {
            foreach ($inputs as $input) {
                Order::find($input['order_id'])
                    ->update(array('completed' => $input['completed']));
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Update is successful',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed. This is an admin action',
            ]);
        }
    }

    public function updateDelivery(AdminDeliveryRequest $request): JsonResponse
    {
        $admin = JWTAuth::parseToken()->authenticate();
        $inputs = $request->all();
        $is_admin = User::find($admin->id)->is_admin;


        if ($is_admin === 1) {
            foreach ($inputs as $input) {
                Delivery::find($input['delivery_id'])
                    ->update(array(
                        'completed' => $input['completed'],
                        'driver' => $input['driver'] ?? null
                    ));
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Update is successful',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed. This is an admin action',
            ]);
        }
    }


    public function destroy(Request $request): JsonResponse
    {
        $admin = JWTAuth::parseToken()->authenticate();
        $user = $request->all();
        $is_admin = User::find($admin->id)->is_admin;


        if ($is_admin === 1) {
            User::destroy($user);

            return response()->json([
                'status' => 'success',
                'message' => 'Update is successful',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed. This is an admin action',
            ]);
        }
    }

    public function cancel(CancelOrderRequest $request): JsonResponse
    {

        $admin = JWTAuth::parseToken()->authenticate();
        $is_admin = User::find($admin->id)->is_admin;

        if ($is_admin === 1) {
            Order::find($request->order_id)->update(array(
                'completed' => '2',
            ));

            return response()->json([
                'status' => 'success',
                'message' => 'Update is successful',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed. This is an admin action',
            ]);
        }
    }
}
