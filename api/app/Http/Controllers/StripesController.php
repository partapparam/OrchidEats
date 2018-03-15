<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OrchidEats\Http\Requests\StripeRequest;
use OrchidEats\Models\User;
use JWTAuth;
use JWTFactory;

class StripesController extends Controller
{

    public function stripeAuthorize(): JsonResponse
    {
        $parameters = array(
            'client_id' => (env('STRIPE_CLIENT_ID')),
            'state' => (env('STATE')),
            'business_type' => (env('BUSINESS_TYPE')),
            'redirect_uri' => (env('REDIRECT_URI'))
        );
        return response()->json([
            'status' => 'success',
            'data' => $parameters
        ], 201);
//        This should return the query string to angular which can be added to the stripe url. Then return the url by calling authService.token
    }

    public function stripeToken(StripeRequest $request): JsonResponse
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

    public function loginLink ()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $id = $user->stripe_user_id;

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $account = \Stripe\Account::retrieve("$id");
        $login_link = $account->login_links->create();

        return response()->json([
            'status' => 'success',
            'data' => $login_link['url']
        ]);
    }
}
