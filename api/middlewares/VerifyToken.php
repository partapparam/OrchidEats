<?php

namespace OrchidEats\Middlewares;

use OrchidEats\Core\Core;
use \Firebase\JWT\JWT;

class VerifyToken extends Core {
	/**
	 * Handle middleware.
	 * 
	 * @param $next
	 */
	public function handle($next)
	{
		$headers = getallheaders();

		if (! array_key_exists('Authorization', $headers)) {
			echo $this->json([
				'status' => 'error',
				'message' => 'Token required'
			], 403);
		} else {
			try {
				$decoded = $this->jwtDecode();
				$next();
			} catch (\Firebase\JWT\SignatureInvalidException $e) {
				echo $this->json([
					'status' => 'error',
					'message' => 'Token verification failed'
				], 403);
			}
		}
	}
}
