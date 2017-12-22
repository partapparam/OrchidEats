"use strict";

function view(fileWithPath) {
	return './views/' + fileWithPath + '.html';
}

var app = angular.module('orchideats', [
	'ngRoute',
	'ngStorage'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: view('home')
	})
	.when('/about', {
		template: '<h1>About us page</h1>'
	})
	.when('/login', {
		templateUrl: view('login'),
		resolve: {
			guest: guest
		}
	})
	.when('/register', {
		templateUrl: view('register'),
		resolve: {
			guest: guest
		}
	})
	.when('/profile', {
		templateUrl: view('profile'),
		resolve: {
			guest: auth
		}
	})
	.otherwise({
		template: '<h1>Sorry! Page not found</h1>'
	});

	$httpProvider.interceptors.push(function ($q, $location, $localStorage) {
	   return {
	       'request': function (config) {
	           config.headers = config.headers || {};
	           if ($localStorage.token) {
	               config.headers.Authorization = 'Bearer ' + $localStorage.token;
	           	}
	           return config;
	       },
	       'responseError': function (response) {
	           if (response.status === 401 || response.status === 403) {
	               $location.path('/login');
	           }
	           return $q.reject(response);
	       }
	   };
	});

	function guest($q, $location, $localStorage) {
		var defer = $q.defer();

		if ($localStorage.token) {
			defer.reject();
			$location.path("/");
		} else {
			defer.resolve();
		}

		return defer.promise;
	}

	function auth($q, $location, $localStorage) {
		var defer = $q.defer();

		if ($localStorage.token) {
			defer.resolve();
		} else {
			defer.reject();
			$location.path("/login");
		}

		return defer.promise;
	}
});
