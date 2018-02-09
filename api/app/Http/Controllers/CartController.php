<?php

namespace OrchidEats\Http\Controllers;


use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OrchidEats\Http\Requests\SaveCartRequest;
use OrchidEats\Http\Resources\CartResource;
use OrchidEats\Models\Cart;
use OrchidEats\Models\User;
use Carbon\Carbon;
use JWTAuth;
use JWTFactory;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(SaveCartRequest $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $cart = $user->cart;

        if ($cart) {
            foreach ($cart as $c) {
                $c->delete();
            }
        }

        $new = $user->cart()->create([
            'carts_user_id' => $request->carts_user_id,
            'carts_chef_id' => $request->carts_chef_id,
            'chefs_order_deadline' => $request->chefs_order_deadline,
            'details' => json_encode($request->details),
            'expired' => 0
        ]);

         $new->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Cart saved successfully',
            'data' => $new
        ], 200);
    }
    /**
     * Display the specified resource.
     *
     * @return JsonResponse
     */
    public function show(): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $cart = $user->cart()->first();

        if ($cart) {
            $cart->details = json_decode($cart->details) ?? null;
        }

//        Check too see if the expiration date has passed the chefs order deadline. If so, the cart becomes expired and nothing gets returned.
        $date = Carbon::now()->timestamp;
        $expiration = Carbon::parse($cart->chefs_order_deadline)->timestamp;

        if ($date < $expiration) {
            return response()->json([
                'status' => 'success',
                'data' => $cart,
            ], 200);
        } else if ($date > $expiration) {
            $cart->delete();
            return response()->json([
                'status' => 'cart expired',
                'data' => $cart
            ]);
        }
    }

    public function update(SaveCartRequest $request): JsonResponse
    {
        $cart = Cart::find($request->cart_id);

        $cart->update(array(
            'details' => json_encode($request->details)
        ));

        if ($request->details === ['empty']) {
            $cart->delete();
        }

        if ($cart) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cart saved successfully',
                'data' => $request->details
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
            ], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
//    public function destroy(SaveCartRequest $request): JsonResponse
//    {
//        $cart = $request->all();
//        $carts = $cart->delete();
//
//        if ($carts) {
//            return response()->json([
//                'status' => 'success',
//                'message' => 'Cart deleted'
//            ], 200);
//        } else {
//            return response()->json([
//                'status' => 'error',
//                'message' => 'Unsuccessful, please try again'
//            ], 200);
//        }
//    }
}
