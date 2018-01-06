<?php

namespace OrchidEats\Http\Middleware;

use Closure;

class RefreshToken extends JWTBaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        try {
            $newToken = $this->auth->setRequest($request)->parseToken()->refresh();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return $this->respond('tymon.jwt.expired', 'Token expired', $e->getStatusCode(), [$e]);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return $this->respond('tymon.jwt.invalid', 'Invalid token', $e->getStatusCode(), [$e]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenBlacklistedException $e) {
            return $this->respond('tymon.jwt.invalid', 'Token has been blacklisted', $e->getStatusCode(), [$e]);
        }

        // send the refreshed token back to the client
        $response->headers->set('Authorization', 'Bearer '.$newToken);

        return $response;
    }
}
