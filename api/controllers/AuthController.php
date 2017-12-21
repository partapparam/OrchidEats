<?php

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

		echo $this->json(['status' => 'success']);
	}

	/**
	 * User login.
	 */
	public function login(): void
	{
		$username = $this->input('username');
		$result = $this->query("SELECT * FROM users WHERE username = '$username' LIMIT 1");
		$row = $result->fetch_assoc();

		if (password_verify($this->input('password'), $row['password'])) {
			echo $this->json(['status' => 'success']);
		} else {
			echo $this->json(['status' => 'wrong password']);
		}
	}
}
