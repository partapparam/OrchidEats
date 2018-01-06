<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use OrchidEats\Http\Requests\LoginRequest;
use OrchidEats\Http\Requests\SignupRequest;
use OrchidEats\Models\User;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Handle signup request.
     * 
     * @param SignupRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signup(SignupRequest $request)
    {
        User::create($request->except('password_confirmation'));

        return response()->json([
            'status' => 'success',
            'message' => 'Signup successful'
        ], 201);
    }

    /**
     * Handle login request.
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        try {
            if (! $token = JWTAuth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid credentials'
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not create token'
            ], 500);
        }

        $user = \Auth::user();
        $customClaims = [
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ];
        $token = JWTAuth::fromUser($user, $customClaims);

        return response()->json([
            'status' => 'success',
            'results' => $token
        ], 200);
    }

    /**
     * Handle logout request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'status' => 'success',
            'message' => 'Logout successful'
        ], 200);
    }

    /**
     * Handle profile request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        $user = JWTAuth::parseToken()->authenticate();

        return response()->json([
            'status' => 'success',
            'results' => $user
        ], 200);
    }
}
