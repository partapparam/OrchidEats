<?php

namespace OrchidEats\Http\Controllers;

 use Illuminate\Http\JsonResponse;
 use Illuminate\Http\Request;
 use OrchidEats\Http\Requests\OffPlatformOrderRequest;
 use OrchidEats\Http\Requests\SaveOrderRequest;
 use OrchidEats\Mail\NewOrder;
 use OrchidEats\Mail\NonUserOrder;
 use Stripe\Stripe;
 use Stripe\Customer;
 use Stripe\Charge;
 use OrchidEats\Models\Chef;
 use OrchidEats\Models\User;
 use OrchidEats\Models\Cart;
 use OrchidEats\Models\Meal;
 use Tymon\JWTAuth\JWTAuth;

 class CheckoutController extends Controller
 {

     public function charge(SaveOrderRequest $request): JsonResponse
     {
        try {

         Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

         $chef = Chef::find($request->chef_id);
         $seller = User::find($chef->chefs_user_id);
         $email = $seller->email;
         $phone = $seller->profile->phone;
         $stripe_user_id = $seller->stripe_user_id;
         $order = $request->order;
         $order_total = 0;
         $deliveryFee = 0;
         $serviceFee = 0.99;

//            Checks to see if there is an account
        if ($order['orders_user_id']) {
            $url = env('APP_URL') . '/upcoming-orders/' . $order['orders_user_id'];
        }
            $customer = Customer::create(array(
                'email' => $request->email,
                'source' => $request->id
            ));

             if ($order['order_details']['method'] == 'Pickup') {
                 $deliveryFee = 0;
             } else if ($order['order_details']['method'] == 'Delivery') {
                 $deliveryFee = floatval($chef->delivery_fee);
             }

             if ($order['bundle'] == true ) {
                 $order_total = $order['order_total'] - $serviceFee;
             } else {
                 foreach ($order['meal_details'] as $meal) {
                     $price = Meal::find($meal['meal_id'])->price;
                     $order_total = $order_total + ($price * $meal['quantity']);
                 }
             }

            if ($order_total > 0) {
                $order_total += ($deliveryFee + $serviceFee);
            }

//         creates fee for service
            $order_total = $order_total * 100;
            $fee = ceil(($order_total * 0.03) + 130);

            //TODO : fix the charge amounts for the fees
            $charge = Charge::create(array(
                'customer' => $customer->id,
                'amount' => $order_total,
                'currency' => 'usd',
                "statement_descriptor" => "Orchid Eats",
                "destination" => array(
                    "amount" => ($order_total - $fee),
                    "account" => $stripe_user_id,
                ),
            ));
//            if charge is true, save the order in the data base and erase the cart.
            if ($charge) {
                $saved = $chef->orders()
                    ->create(array(
                        'orders_user_id' => $order['orders_user_id'] ?? null,
                        'orders_chef_id' => $chef->chef_id,
                        'meal_details' => json_encode($order['meal_details']),
                        'customer_details' => json_encode($order['customer_details']),
                        'order_details' => json_encode($order['order_details']),
                        'order_total' => (($order_total) / 100),
                        'payment_method' => $order['payment_method']
                    ));

                if ($saved) {
                    $user = User::find($order['orders_user_id']) ?? null;
                    if ($user != null) {
                        $user->cart()->delete();
                        $data['url'] = $url;
                        $data['buyer'] = $user->first_name;
                        \Mail::to($order['customer_details']['email'])->send(new NewOrder($data));
                    } else {
                        $data['order'] = $order['order_details'];
                        $data['meals'] = $order['meal_details'];
                        $data['total'] = (($order_total) / 100);
                        $data['buyer'] = $order['customer_details']['name'];
                        $data['email'] = $email;
                        $data['phone'] = $phone;
                        \Mail::to($order['customer_details']['email'])->send(new NonUserOrder($data));
                    }
                }
            }

         return response()->json([
             'status' => 'success',
         ]);
        } catch (\Exception $ex) {
        return response()->json($ex->getMessage());
        }
    }

    public function saveOrder (OffPlatformOrderRequest $request) {
        $order = $request;
        $chef = Chef::find($order['chef_id']);
        $chefUser = User::find($chef->chefs_user_id);
        $email = $chefUser->email;
        $phone = $chefUser->profile->phone;
        $order_total = 0;
        $deliveryFee = 0;
//        $serviceFee = 0.99;

//        Checks to see if there is an account
        if ($order['orders_user_id']) {
            $url = env('APP_URL') . '/upcoming-orders/' . $order['orders_user_id'];
        }

//        checks for delivery or pickup
        if ($order['order_details']['method'] == 'Pickup') {
            $deliveryFee = 0;
        } else if ($order['order_details']['method'] == 'Delivery') {
            $deliveryFee = floatval($chef->delivery_fee);
        }

//        sets the bundle price if there is one
        if ($order['bundle'] == true ) {
            $order_total = $order['order_total'];
        } else {
            foreach ($order['meal_details'] as $meal) {
                $price = Meal::find($meal['meal_id'])->price;
                $order_total = $order_total + ($price * $meal['quantity']);
            }
        }

        if ($order_total > 0) {
            $order_total += ($deliveryFee);
        }

        $saved = $chef->orders()
            ->create(array(
                'orders_user_id' => $order['orders_user_id'] ?? null,
                'orders_chef_id' => $chef->chef_id,
                'meal_details' => json_encode($order['meal_details']),
                'customer_details' => json_encode($order['customer_details']),
                'order_details' => json_encode($order['order_details']),
                'order_total' => $order_total,
                'payment_method' => $order['payment_method']
            ));

        if ($saved) {
            $user = User::find($order['orders_user_id']) ?? null;
            if ($user != null) {
                $user->cart()->delete();
                $data['url'] = $url;
                $data['buyer'] = $user->first_name;
                \Mail::to($order['customer_details']['email'])->send(new NewOrder($data));
            } else {
                $data['order'] = $order['order_details'];
                $data['meals'] = $order['meal_details'];
                $data['total'] = $order_total;
                $data['buyer'] = $order['customer_details']['name'];
                $data['email'] = $email;
                $data['phone'] = $phone;
                \Mail::to($order['customer_details']['email'])->send(new NonUserOrder($data));
            }


            return response()->json([
                'status' => 'success'
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'data' => [$email, $phone]
            ]);
        }
    }
 }

