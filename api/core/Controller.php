<?php

class Controller extends Database {
	/**
	 * Generate JSON data.
	 * 
	 * @param  array  $data
	 * @return string
	 */
	protected function json(array $data): string
	{
		header('Content-Type: application/json');
		$json = json_encode($data);

		return $json;
	}

	/**
	 * Get the data from POST or GET request.
	 * 
	 * @param  string|null $key
	 * @return string|array
	 */
	protected function input(string $key = null)
	{
	    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? $_GET;

	    if ($key !== null) {
	    	return $data[$key];
	    }

	    return $data;
	}
}
