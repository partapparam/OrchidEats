<?php

namespace OrchidEats\Http\Middleware;

use Closure;

class GetuserFromToken extends JWTBaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if (! $token = $this->auth->setRequest($request)->getToken()) {
            return $this->respond('tymon.jwt.absent', 'Token is missing', 401);
        }

        try {
            $user = $this->auth->authenticate($token);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return $this->respond('tymon.jwt.expired', 'Token expired', $e->getStatusCode(), [$e]);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return $this->respond('tymon.jwt.invalid', 'Invalid token', $e->getStatusCode(), [$e]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenBlacklistedException $e) {
            return $this->respond('tymon.jwt.invalid', 'Token has been blacklisted', $e->getStatusCode(), [$e]);
        }

        if (! $user) {
            return $this->respond('tymon.jwt.user_not_found', 'User not found', 404);
        }

        return $response;
    }
}
