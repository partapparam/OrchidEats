"use strict";

var app = angular.module('orchideats', [
	'ngRoute',
	'ngStorage'
]);

app.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		template: '<h1>Home page</h1>'
	})
	.when('/about', {
		template: '<h1>About us page</h1>'
	})
	.otherwise({
		template: '<h1>Sorry! Page not found</h1>'
	});
});
