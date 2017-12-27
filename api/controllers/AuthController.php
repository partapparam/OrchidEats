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
	public function signup(): void
    {
        $email = $this->input('email');
        $password = password_hash($this->input('password'), PASSWORD_BCRYPT, ['cost' => 12]);
        $first_name = $this->input('first_name');
        $last_name = $this->input('last_name');

        $result = $this->query("SELECT * FROM Users where email='$email' LIMIT 1");

        if ($result) {
            echo $this->json(['status' => 'error', 'message' => 'Email address is already registered']);
            return;
        } else if (! $result) {
            $this->query("INSERT INTO Users (email, password, first_name, last_name) VALUES ('$email', '$password', '$first_name', '$last_name')");

            echo $this->json(['status' => 'success', 'message' => 'Registration successful']);
            return;
        }
    }

	/**
	 * User login.
	 */
	public function login(): void
	{
		$email = $this->input('email');
		$result = $this->query("SELECT * FROM Users WHERE email=$email LIMIT 1");

		if (! $result) {
			echo $this->json(['status' => 'error', 'message' => 'Incorrect email']);

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
		        	'id' => $row['user_id'],
					'email' => $row['email']
		        ]
			];

			$jwt = JWT::encode($claim, $this->config['jwtsecret']);

			echo $this->json(['status' => 'success', 'token' => $jwt]);
		} else {
			echo $this->json(['status' => 'error', 'message' => $result]);
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

    /**
     * Post new user profile info.
     */
	public function edit_profile()
    {
        #decode
    }
}
