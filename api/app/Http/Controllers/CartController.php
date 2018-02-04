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
        /* NOTE: Watch the 'firstOrNew' method! More info: https://laravel.com/docs/5.5/eloquent */
        $cart = User::find($user->id)->cart()->create([
            'carts_user_id' => $request->carts_user_id,
            'chefs_order_deadline' => $request->order_deadline,
            'details' => json_encode($request->details),
            'expired' => 0
        ]);
        $cart->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Cart saved successfully',
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

        $cart = new CartResource($user);
//        $cart->details = json_decode($cart->details);
        $date = Carbon::parse($cart->created_at)->timestamp;
        $expiration = Carbon::parse($cart->order_deadline)->timestamp;
        if ($date <= $expiration) {
            return response()->json([
                'status' => 'success',
                'data' => $cart,
            ], 200);
        } else if ($date >= $expiration) {
            return response()->json([
                'status' => 'cart expired',
            ]);
        }
    }

    public function update(SaveCartRequest $request): JsonResponse
    {
        $cart = Cart::find($request->cart_id)->update(array(
            'details' => json_encode($request->details)
        ));

        if ($cart) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cart saved successfully',
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
    public function destroy(SaveCartRequest $request): JsonResponse
    {
        $cart = $request->all();
        $carts = Cart::destroy($cart);

        if ($carts) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cart deleted'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unsuccessful, please try again'
            ], 200);
        }
    }
}
