"use strict";

angular.module('OrchidApp')
    .controller('AuthController', function ($scope, authService, $localStorage, $location, Notification) {
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

			if (res.status === 'error') {
                Notification.error(res.message);
                angular.forEach(res.message, function(message, field) {
                    $scope.loginForm[field].$setValidity('server', false);
                    $scope.errorMessage[field] = res.message[field];
                });
			} else if (res.status === 'success') {
				$localStorage.token = res.results;
				checkAuth();
                $location.path('/');
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

			if (res.status === 'success') {
                Notification.success(res.message);
                $location.path('/login');
			} else {
                Notification.error('Whoops! Something went wrong');
			}
		});
	};

	$scope.forgotPassword = function () {
        authService.forgotPassword($scope.data, function (res) {
			res = res.data;

			if (res.status === 'success') {
                Notification.success(res.message);
			}
        }, function (res) {
            res = res.data;

            if (res.status_code === 422) {
                for (var error in res.errors) {
                    for (var i = 0; i < res.errors[error].length; i++) {
                        Notification.error(res.errors[error][i]);
                    }
                }
                Notification.error(res.message);
            }
		});
    }

    $scope.resetPassword = function () {
	    $scope.data['email'] = $location.search().email;

        authService.resetPassword($scope.data, function (res) {
            res = res.data;

            if (res.status === 'success') {
                Notification.success(res.message);
                $location.path('/login');
            }
        }, function (res) {
            res = res.data;

            if (res.status_code === 422) {
                for (var error in res.errors) {
                    for (var i = 0; i < res.errors[error].length; i++) {
                        Notification.error(res.errors[error][i]);
                    }
                }
                Notification.error(res.message);
            }
        });
    }
});
