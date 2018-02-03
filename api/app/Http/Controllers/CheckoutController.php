<?php

namespace OrchidEats\Http\Controllers;

 use Illuminate\Http\Request;
 use Stripe\Stripe;
 use Stripe\Customer;
 use Stripe\Charge;
 use OrchidEats\Models\Chef;
 use OrchidEats\Models\User;

class CheckoutController extends Controller
{

    public function charge(Request $request)
    {
        try {

            Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

            $chef = Chef::find($request->chef_id);
            $user = User::find($chef->chefs_user_id);
            $stripe_user_id = $user->stripe_user_id;


            $customer = Customer::create(array(
                'email' => $request->email,
                'source' => $request->id
            ));

//            //                TO-DO : fix the charge amounts for the fees
            $charge = Charge::create(array(
                'customer' => $customer->id,
                'amount' => $request->total,
                'currency' => 'usd',
                "statement_descriptor" => "Orchid Eats",
                "destination" => array(
                    "amount" => 877,
                    "account" => $stripe_user_id,
                ),
            ));
            return response()->json(['data'=> $charge]);
        } catch (\Exception $ex) {
        return $ex->getMessage();
        }
    }
}

