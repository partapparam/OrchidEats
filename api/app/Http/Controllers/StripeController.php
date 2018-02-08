<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use OrchidEats\Http\Requests\StripeTokenRequest;
use OrchidEats\Models\User;
use JWTAuth;
use JWTFactory;

class StripeController extends Controller
{

    public function stripeAuthorize()
    {
        $parameters = array(
            'client_id' => (env('STRIPE_CLIENT_ID')),
            'state' => (env('STATE')),
            'business_type' => (env('BUSINESS_TYPE')),
            'redirect_uri' => 'http://orchideats.test/chef-dashboard'
        );
        return response()->json([
            'status' => 'success',
            'data' => $parameters
        ], 201);
//        This should return the query string to angular which can be added to the stripe url. Then return the url by calling authService.token
    }

    public function stripeToken(StripeTokenRequest $request)
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        \Stripe\Stripe::setClientId(env('STRIPE_CLIENT_ID'));
        $user = JWTAuth::parseToken()->authenticate();

        $code = $request->input('0');
        $urlState = $request->input('1');

        if (env('STATE') != $urlState) {
            return response()->json([
                'status' => 'fail'
            ], 301);
        };

        $resp = \Stripe\OAuth::token(array(
            'grant_type' => 'authorization_code',
            'code' => $code,
        ));

        if (!$resp) {
            return response()->json([
                'status' => 'error',
                'message' => 'TODO'
            ], 301);
        } else {
            User::find($user->id)->update(array(
                'stripe_user_id' => $resp->stripe_user_id
            ));

            return response()->json([
                'status' => 'success',
                'message' => 'Stripe account is linked',
            ]);
        }
    }
}
