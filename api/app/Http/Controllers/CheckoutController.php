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

    public function charge(SaveOrderRequest $request)
    {
        try {

            Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

            $chef = Chef::find($request->chef_id);
            $user = User::find($chef->chefs_user_id);
            $stripe_user_id = $user->stripe_user_id;
            $order = $request->order;
            $order_total = 0;
            $deliveryFee = 4.99;
            $serviceFee = 0.99;

            foreach($order['meal_details'] as $meal) {
                    $price = Meal::find($meal['meal_id'])->price;
                    $order_total = $order_total + ($price * $meal['quantity']);
            }

            if ($order_total > 0) {
                $order_total += ($deliveryFee + $serviceFee);
            }

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
                $cart = User::find($order['orders_user_id'])->cart()->where('expired', '=', '0')->get();
                $order = User::find($order['orders_user_id'])->orders()
                    ->create(array(
                        'orders_user_id' => $order['orders_user_id'],
                        'orders_chef_id' => $request->chef_id,
                        'meal_details' => json_encode($order['meal_details']),
                        'order_total' => $order['order_total'],
                        'chefs_delivery_window' => $chef->delivery_window,
                        'chefs_delivery_date' => $chef->delivery_date
                    ));

                if ($order) {
                    Cart::find($cart[0]->cart_id)->delete();
                }
            }

            return response()->json([
                'status' => 'success',
            ]);
        } catch (\Exception $ex) {
        return $ex->getMessage();
        }
    }
}

