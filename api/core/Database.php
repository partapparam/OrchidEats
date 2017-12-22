<?php

namespace OrchidEats\Core;

class Database {
	/**
	 * Database connection.
	 * 
	 * @return
	 */
	private function connect() {
		$connection = new \mysqli('localhost', 'root', '', 'test_db');

		return $connection;
	}

	/**
	 * Query the result.
	 * 
	 * @param  string $query
	 * @return
	 */
	protected function query(string $query) {
		$con = $this->connect();
		return $con->query($query);
	}
}
