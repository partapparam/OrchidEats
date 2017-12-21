<?php

function __autoload($classname) {
	if (file_exists(__DIR__ . '/core/' . $classname . '.php')) {
		require_once __DIR__ . '/core/' . $classname . '.php';
	} else if (file_exists(__DIR__ . '/controllers/' . $classname . '.php')) {
		require_once __DIR__ . '/controllers/' . $classname . '.php';
	}
}

require __DIR__ . '/routes.php';
