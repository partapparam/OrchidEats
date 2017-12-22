"use strict";

app.controller('AuthController', function ($scope, authService, $localStorage, $location) {
	$scope.data = {};

	function checkAuth() {
		if ($localStorage.token) {
			$scope.auth = authService.getClaimsFromToken($localStorage.token);
		}
	}

	checkAuth();

	$scope.login = function () {
		authService.login($scope.data, function (res) {
			res = res.data;

			if (res.status === "error") {
				alert(res.message);
			} else {
				$localStorage.token = res.token;
				checkAuth();
				$location.path("/");
			}
		});
	}

	$scope.logout = function () {
		delete $localStorage.token;
		$scope.auth = false;
		$location.path("/");
	}

	$scope.register = function () {
		authService.register($scope.data, function (res) {
			res = res.data;
			alert(res.message);
			$location.path("/login");
		});
	}
});
