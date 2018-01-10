<?php

namespace OrchidEats\Http\Controllers;

 use Illuminate\Http\Request;
 use Stripe\Stripe;
 use Stripe\Customer;
 use Stripe\Charge;

class CheckoutController extends Controller
{

    public function charge(Request $request)
    {
        try
            {Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

            $customer = Customer::create(array(
                'email' => $request->stripeEmail,
                'source' => $request->stripeToken
            ));

            $charge = Charge::create(array(
//                TO-DO : fix the charge amounts for the fees
                'customer' => $customer->id,
                'amount' => 1999,
                'currency' => 'usd',
                "destination" => array(
                    "amount" => 877,
                    "account" => "{CONNECTED_STRIPE_ACCOUNT_ID}",
                ),
            ));
            return 'Charge successful';
        } catch (\Exception $ex) {
        return $ex->getMessage();
        }
    }
}

