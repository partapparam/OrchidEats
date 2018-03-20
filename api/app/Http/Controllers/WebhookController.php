<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use OrchidEats\Models\Webhook;
use JWTAuth;
use OrchidEats\Http\Requests\StripeRequest;
use Stripe\Stripe;
use JWTFactory;


class WebhookController extends Controller
{
    public function show(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data = null;

        if ($user->admin == 1) {
            $data = Webhook::all();
            foreach ($data as $d) {
                $d->data = json_decode($d->data);
            }
        }

        if ($data) {
            return response()->json([
                'status' => 'success',
                'data' => $data
            ]);
        } else {
            return response()->json([
                'status' => 'error',
//                    'data' => $data
            ]);
        }
    }

    public function account()
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

// Retrieve the request's body and parse it as JSON
        $input = @file_get_contents("php://input");
        $event_json = json_decode($input);

        $event = \Stripe\Event::retrieve($event_json->id);

        $webhook = new Webhook;
        $webhook->event = $event->type;
        $webhook->data = $input;
        $webhook->type = 'account';

        http_response_code(200);
    }

    public function connect()
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $input = @file_get_contents("php://input");
        $event_json = json_decode($input);

        $event = \Stripe\Event::retrieve($event_json->id);

            $webhook = new Webhook;
            $webhook->event = $event->type;
            $webhook->data = $event->id;
            $webhook->type = 'connect';

        http_response_code(200);
    }
}
