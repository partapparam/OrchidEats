<?php

header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json; charset=UTF-8'); 
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // return only the headers and not the content
  // only allow CORS if we're doing a GET - i.e. no saving for now.
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && ($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET' || $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST')) {
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
	}
	exit;
}

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/routes.php';
