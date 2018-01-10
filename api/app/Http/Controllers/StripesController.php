<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Charge;
use OrchidEats\Models\Profile;
use OrchidEats\Models\Stripes;
use OrchidEats\Models\User;
use JWTAuth;
use JWTFactory;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Tymon\JWTAuth\Exceptions\JWTException;

class StripesController extends Controller
{

    public function authorize (Request $request)
    {
        $parameters = array(
            'client_id' => (env('STRIPE_CLIENT_ID')),
            'state' => (env('STATE')),
            'stripe_user[business_type' => 'individual'
        );
        return response()->json([
            'status' => 'success',
            'data' => $parameters
        ], 201);
//        This should return the query string to angular which can be added to the stripe url. Then return the url by calling authService.token
    }

    public function token (Request $request, $id) {
        $client = new Client();

        $provider = new \AdamPaterson\OAuth2\Client\Provider\Stripe([
            'clientId'          => env('STRIPE_CLIENT_ID'),
            'clientSecret'      => env('STRIPE_SECRET_KEY'),
            'redirectUri'       => 'https://orchideats.test/chef-dashboard',
        ]);
        $code = $request->input('code');
        $urlState = $request->input('state');

        if (!isset($code)) {
            // If we don't have an authorization code then get one
            $authUrl = $provider->getAuthorizationUrl();
            $_SESSION['oauth2state'] = $provider->getState();
            header('Location: '.$authUrl);
            exit;
// Check given state against previously stored one to mitigate CSRF attack
        } elseif (empty($urlState) || ($urlState !== (env('STATE')))) {
            unset($_SESSION['oauth2state']);
            exit('Invalid state');
        } else {

            // Try to get an access token (using the authorization code grant)
            $token = $provider->getAccessToken('authorization_code', [
                'code' => $code
            ]);

            // Optional: Now you have a token you can look up a users profile data
            try {

                // We got an access token, let's now get the user's details
                $account = $provider->getResourceOwner($token);

                // Use these details to create a new profile
                return response()->json($account->getDisplayName(), 201);
            } catch (Exception $e) {
                // Failed to get user details
                exit('Oh dear...');
            }

            // Use this to interact with an API on the users behalf
//            echo $token->getToken();
        }
//
//
//
//
//
//        if (env('STATE') != $request->query('state')) {
//            return response()->json([
//                'status' => 'fail'
//            ], 301);
//        };
//
//        $result = $client->post(env('STRIPE_tokenUri'), [
//                'grant_type' => 'authorization_code',
//                'client_id' => (env('STRIPE_CLIENT_ID')),
//                'client_secret' => (env('STRIPE_SECRET_KEY')),
//                'code' => $request->query('code'),
//                'json' => true
//         ]);
//
//        if (!$result) {
//            return response()->json([
//                'status' => 'error',
//                'data' => $result
//            ], 301);
//        } else {
//            Stripes::create($result);
//            return response()->json([
//                'status' => 'success',
//                'message' => 'Stripes account is linked'
//            ]);
//        }
    }
}

