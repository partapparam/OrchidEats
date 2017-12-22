<?php

namespace OrchidEats\Core;

class Route {
	static $availableRoutes = [];

	/**
	 * Get url.
	 * 
	 * @param $route
	 * @param $function
	 */
	public static function get($route, $function) {
		// self::availableRoutes[] = $route;

		if ($_GET['url'] === $route) {
			if (gettype($function) === 'string') {
				$classWithMethod = explode('@', $function);
				$class = '\\OrchidEats\\Controllers\\' . $classWithMethod[0];
				$method = $classWithMethod[1];


				$init = new $class;
				$init->$method();
			} else {
				$function->__invoke();
			}
		}
	}

	/**
	 * Insert extra layer of protection.
	 * 
	 * @param $class
	 * @param $function
	 */
	public static function middleware($class, $function): void
	{
		$classWithNamespace = '\\OrchidEats\\Middlewares\\' . $class;
		$init = new $classWithNamespace;
		$init->handle($function);
	}
}
