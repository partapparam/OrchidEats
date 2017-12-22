<?php

namespace OrchidEats\Core;

class Controller extends Core {
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
