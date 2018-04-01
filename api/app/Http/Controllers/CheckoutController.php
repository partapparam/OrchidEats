<?php

namespace OrchidEats\Http\Controllers;

 use Illuminate\Http\JsonResponse;
 use Illuminate\Http\Request;
 use OrchidEats\Http\Requests\OffPlatformOrderRequest;
 use OrchidEats\Http\Requests\SaveOrderRequest;
 use OrchidEats\Mail\NewOrder;
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
         $stripe_user_id = $seller->stripe_user_id;
         $order = $request->order;
         $order_total = 0;
         $deliveryFee = 0;
         $serviceFee = 1.49;
         $url = env('APP_URL') . '/upcoming-orders/' . $order['orders_user_id'];

            $customer = Customer::create(array(
                'email' => $request->email,
                'source' => $request->id
            ));

         if ($order['order_details']['method'] == 'Pickup') {
             $deliveryFee = 0;
         } else if ($order['order_details']['method'] == 'Delivery') {
             $deliveryFee = floatval($chef->delivery_fee);
         }

            foreach($order['meal_details'] as $meal) {
                    $price = Meal::find($meal['meal_id'])->price;
                    $order_total = $order_total + ($price * $meal['quantity']);
            }

            if ($order_total > 0) {
                $order_total += ($deliveryFee + $serviceFee);
            }

//         creates fee for service
            $order_total = $order_total * 100;
            $fee = ceil(($order_total * 0.03) + 179);

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
                        'orders_user_id' => $order['orders_user_id'],
                        'orders_chef_id' => $chef->id,
                        'meal_details' => json_encode($order['meal_details']),
                        'customer_details' => json_encode($order['customer_details']),
                        'order_details' => json_encode($order['order_details']),
                        'order_total' => (($order_total - $fee) / 100),
                        'payment_method' => $order['payment_method']
                    ));

                if ($saved) {
                    $user = User::find($order['orders_user_id']);
                    $user->cart()->delete();
                    $order['url'] = $url;
                    $order['buyer'] = $user->first_name;
                    \Mail::to($order['customer_details']['email'])->send(new NewOrder($order));
                }
            }

         return response()->json([
             'status' => 'success',
             'data' => [$order_total, $fee]
         ]);
        } catch (\Exception $ex) {
        return response()->json($ex->getMessage());
        }
    }

    public function saveOrder (OffPlatformOrderRequest $request) {
        $order = $request;
        $chef = Chef::find($order->chef_id);
        $order_total = 0;
        $deliveryFee = 0;
        $serviceFee = 1.49;
        $url = env('APP_URL') . '/upcoming-orders/' . $order['orders_user_id'];

        if ($order['order_details']['method'] == 'Pickup') {
            $deliveryFee = 0;
        } else if ($order['order_details']['method'] == 'Delivery') {
            $deliveryFee = floatval($chef->delivery_fee);
        }

        foreach($order['meal_details'] as $meal) {
            $price = Meal::find($meal['meal_id'])->price;
            $order_total = $order_total + ($price * $meal['quantity']);
        }

        if ($order_total > 0) {
            $order_total += ($deliveryFee + $serviceFee);
        }

        $saved = $chef->orders()
            ->create(array(
                'orders_user_id' => $order['orders_user_id'],
                'orders_chef_id' => $chef->id,
                'meal_details' => json_encode($order['meal_details']),
                'customer_details' => json_encode($order['customer_details']),
                'order_details' => json_encode($order['order_details']),
                'order_total' => $order_total,
                'payment_method' => $order['payment_method']
            ));

        if ($saved) {
            $user = User::find($order['orders_user_id']);
            $user->cart()->delete();
            $order['url'] = $url;
            $order['buyer'] = $user->first_name;
            \Mail::to($order['customer_details']['email'])->send(new NewOrder($order));

            return response()->json([
                'status' => 'success'
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }
 }

