<?php

namespace OrchidEats\Core;

use \Firebase\JWT\JWT;

class Core extends Database {
	protected $config;

	public function __construct()
	{
		$this->config = require __DIR__ . '/../config.php';
	}

	/**
	 * JWT Token decode.
	 * 
	 * @return
	 */
	protected function jwtDecode()
	{
	    $headers = getallheaders();
	    $tokenArr = explode('Bearer ', $headers['Authorization']);
		$decoded = JWT::decode($tokenArr[1], $this->config['jwtsecret'], $this->config['algo']);

		return $decoded;
	}

	/**
	 * Generate JSON data.
	 * 
	 * @param  array  $data
	 * @return string
	 */
	protected function json(array $data, $code = 0, string $message = null): string
	{
		if ($code > 0) {
			header("HTTP/1.0 $code $message");
		}

		header('Content-Type: application/json');
		$json = json_encode($data);

		return $json;
	}

	protected function handleNext($next)
	{
		if (gettype($next) === 'string') {
			$classWithMethod = explode('@', $next);
			$class = '\\OrchidEats\\Controllers\\' . $classWithMethod[0];
			$method = $classWithMethod[1];

			$init = new $class;
			$init->$method();
		} else {
			$next->__invoke();
		}
	}
}
