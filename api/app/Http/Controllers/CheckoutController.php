<?php

namespace OrchidEats\Http\Controllers;

 use Illuminate\Http\JsonResponse;
 use Illuminate\Http\Request;
 use OrchidEats\Http\Requests\SaveOrderRequest;
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
         $deliveryFee = 4.99;
         $serviceFee = 0.99;

         if ($order['order_details']['method'] == 'pickup') {
             $deliveryFee = 0;
         }

            foreach($order['meal_details'] as $meal) {
                    $price = Meal::find($meal['meal_id'])->price;
                    $order_total = $order_total + ($price * $meal['quantity']);
            }

            if ($order_total > 0) {
                $order_total += ($deliveryFee + $serviceFee);
            }
//
            $customer = Customer::create(array(
                'email' => $request->email,
                'source' => $request->id
            ));

            //TODO : fix the charge amounts for the fees
            $charge = Charge::create(array(
                'customer' => $customer->id,
                'amount' => $order_total * 100,
                'currency' => 'usd',
                "statement_descriptor" => "Orchid Eats",
                "destination" => array(
                    "amount" => 877,
                    "account" => $stripe_user_id,
                ),
            ));
//            if charge is true, save the order in the data base and erase the cart.
            if ($charge) {
                $buyer = User::find($order['orders_user_id']);
                $order = $buyer->orders()
                    ->create(array(
                        'orders_user_id' => $order['orders_user_id'],
                        'orders_chef_id' => $request->chef_id,
                        'meal_details' => json_encode($order['meal_details']),
                        'customer_details' => json_encode($order['customer_details']),
                        'order_details' => json_encode($order['order_details']),
                        'order_total' => $order['order_total'],
                    ));

                if ($order) {
                    $buyer->cart()->delete();
                }
            }

         return response()->json([
             'status' => 'success',
         ]);
        } catch (\Exception $ex) {
        return response()->json([$ex->getMessage()]);
        }
    }
 }

