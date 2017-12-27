"use strict";

angular.module('OrchidApp')
    .controller('AuthController', function ($scope, authService, $localStorage, $location) {
	$scope.data = {};

	function checkAuth() {
		if ($localStorage.token) {
			$scope.auth = authService.getClaimsFromToken($localStorage.token);
		}
	}

	checkAuth();

	$scope.login = function () {
		authService.login($scope.data, function (res) {
			res = res.config.data;

			if (res.status === 'error') {
			    console.log('error');
                angular.forEach(res.message, function(message, field) {
                    $scope.loginForm[field].$setValidity('server', false);
                    $scope.errorMessage[field] = res.message[field];
                });
			} else {
				console.log(res);
				$localStorage.token = res.token;
				checkAuth();
			}
		});
	};

    $scope.isChef = function() {
        if ($localStorage.is_chef === 'Y') {
            return true;
        } else {
            return false;
        }
    };

	$scope.logout = function () {
		delete $localStorage.token;
		$scope.auth = false;
		$location.path("/");
	};

	$scope.signup = function () {
		authService.signup($scope.data, function (res) {
			res = res.data;
			alert(res.message);
		});
	};
});
