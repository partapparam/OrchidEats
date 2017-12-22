<?php

namespace OrchidEats\Controllers;

use OrchidEats\Core\Controller;
use \Firebase\JWT\JWT;

class AuthController extends Controller {
	public function index(): void
	{
		echo $this->json(['message' => 'Welcome to OrchidEats API']);
	}

	/**
	 * User registration.
	 */
	public function register(): void
	{
		$username = $this->input('username');
		$email = $this->input('email');
		$password = password_hash($this->input('password'), PASSWORD_BCRYPT, ['cost' => 12]);

		$this->query("INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')");

		echo $this->json(['status' => 'success', 'message' => 'Registration successful']);
	}

	/**
	 * User login.
	 */
	public function login(): void
	{
		$username = $this->input('username');
		$result = $this->query("SELECT * FROM users WHERE username = '$username' LIMIT 1");

		if (! $result) {
			echo $this->json(['status' => 'error', 'message' => 'Wrong username']);

			return;
		}

		$row = $result->fetch_assoc();

		if (password_verify($this->input('password'), $row['password'])) {
			$tokenId    = base64_encode(random_bytes(32));
		    $issuedAt   = time();
		    $notBefore  = $issuedAt + 10; //Adding 10 seconds
		    $expire     = $notBefore + 60; // Adding 60 seconds
		    $serverName = "http://api.orchideats.test";
			$claim = [
				'iat'  => $issuedAt,
		        'jti'  => $tokenId,
		        'iss'  => $serverName,
		        'nbf'  => $notBefore,
		        'exp'  => $expire,
		        'data' => [
		        	'id' => $row['id'],
		        	'username' => $row['username'],
					'email' => $row['email']
		        ]
			];

			$jwt = JWT::encode($claim, $this->config['jwtsecret']);

			echo $this->json(['status' => 'success', 'token' => $jwt]);
		} else {
			echo $this->json(['status' => 'error', 'message' => 'Wrong password']);
		}

		return;
	}

	/**
	 * Get the authenticated user's profile.
	 */
	public function profile()
	{
		$decodedToken = $this->jwtDecode();

		echo $this->json([
			'status' => 'success',
			'results' => $decodedToken->data
		]);
	}
}
