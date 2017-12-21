<?php

class Route {
	static $availableRoutes = [];

	public static function get($route, $function) {
		// self::availableRoutes[] = $route;

		if ($_GET['url'] === $route) {
			if (gettype($function) === 'string') {
				$classWithMethod = explode('@', $function);
				$class = $classWithMethod[0];
				$method = $classWithMethod[1];


				$init = new $class;
				$init->$method();
			} else {
				$function->__invoke();
			}
		}
	}
}
