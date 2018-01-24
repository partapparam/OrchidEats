<?php
namespace OrchidEats\Http\Controllers;
use OrchidEats\Http\Requests\ForgotPasswordRequest;
use OrchidEats\Http\Requests\LoginRequest;
use OrchidEats\Http\Requests\ResetPasswordRequest;
use OrchidEats\Http\Requests\ResetPasswordValidityRequest;
use OrchidEats\Http\Requests\SignupRequest;
use OrchidEats\Http\Requests\UpdatePasswordRequest;
use OrchidEats\Models\PasswordReset;
use OrchidEats\Models\User;
use JWTAuth;
use JWTFactory;
use DB;
use Illuminate\Support\Facades\Hash;
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
        $user = User::create($request->except('password_confirmation'));
        $user->profile->save();
        $user->is_chef = 0;
        $token = JWTAuth::fromUser($user);
        return response()->json([
            'status' => 'success',
            'message' => 'Your account has been created',
            'token' => $token
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
            if (!JWTAuth::attempt($request->only('email', 'password'))) {
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
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
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
     * Generate token for password recovery.
     *
     * @return string
     */
    private function generateToken()
    {
        $token = generate_token();
        $row = PasswordReset::where('token', $token);
        if ($row->count() > 0) {
            return $this->generateToken();
        }
        return $token;
    }
    /**
     * Send password request link.
     *
     * @param ForgotPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $token = $this->generateToken();
        $user = User::where('email', $request->email)->first();
        $url = env('APP_URL') . '/passwordReset?email='. $user->email . '&token=' . $token;
        $user->passwordReset()->create([
            'email' => $user->email,
            'token' => $token,
            'expiry' => \Carbon\Carbon::now()->addDay(1)->timestamp
        ]);
        \Mail::send('emails.password-reset', ['name' => $user->first_name, 'url' => $url], function ($message) use ($user) {
            $message->to($user->email, $user->first_name)->subject('Reset your password');
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Password request link has been sent to your email'
        ], 200);
    }
    /**
     * Check password reset request is valid.
     *
     * @param ResetPasswordValidityRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPasswordValidityRequest(ResetPasswordValidityRequest $request)
    {
        $now = \Carbon\Carbon::now()->timestamp;
        $passwordReset = PasswordReset::where('email', $request->email)->where('token', $request->token)->where('valid', true)->first();
        if (is_null($passwordReset)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Sorry! We could not verify your request',
                'status_code' => 400
            ], 400);
        }
        if ($passwordReset->expiry < $now) {
            return response()->json([
                'status' => 'error',
                'message' => 'Sorry! The token has expired',
                'status_code' => 400
            ], 400);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'request_valid',
            'status_code' => 200
        ], 200);
    }
    /**
     * Reset the password.
     *
     * @param ResetPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
//        TODO come back to this and make sure bcrypt function works
        $passwordReset = PasswordReset::where('email', $request->email)->where('valid', true);
        $user = $passwordReset->first()->user;
        $user->update(['password' => bcrypt($request->password)]);
        $passwordReset->update(['valid' => false]);
        return response()->json([
            'status' => 'success',
            'message' => 'Password reset successful',
            'status_code' => 200
        ], 200);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $email = JWTAuth::parseToken()->authenticate();

//        gets the user using the token email
//        makeVisible overrides User Model hidden function
        $user = User::where('email', $email->email)->first();
        $user->makeVisible('password');

        if (! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'Failed',
                'message' => 'Password reset unsuccessful, try again',
                'status_code' => 200
            ], 200);
//            The User model auto crypts the password, no need to include hash or bcrypt function.
        } else if (Hash::check($request->password, $user->password)) {
            $user->update(['password' => $request->new_password]);
            return response()->json([
                'status' => 'success',
                'message' => 'Password reset successful',
                'status_code' => 200
            ], 200);
        }
    }

}
