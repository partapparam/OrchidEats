"use strict";

angular.module('OrchidApp')
    .controller('AuthController', function ($scope, $rootScope, authService, $localStorage, $location, Notification, $transitions) {
        $scope.data = {};
        var vm = this;
        vm.date = new Date();
        var url = 0;

        $scope.navCollapsed = true;
        $transitions.onSuccess({}, function () {
            $scope.navCollapsed = true;
        });

        function checkAuth() {
            if ($localStorage.token) {
                $rootScope.auth = authService.getClaimsFromToken($localStorage.token);
                console.log($rootScope.auth.data, $rootScope.auth);
            }
        }

        checkAuth();

        $scope.login = function () {
            authService.login($scope.data, function (res) {
                res = res.data;

                if (res.status === 'error') {
                    Notification.error(res.message);
                } else if (res.status === 'success') {
                    $localStorage.token = res.data;
                    checkAuth();
                    if ($scope.auth.data.is_chef === 0) {
                        $location.path('/edit-profile/' + $scope.auth.data.id);
                    } else if ($scope.auth.data.is_chef === 1) {
                        $location.path('/chef-dashboard');
                    }
                }
            });
        };

        $scope.logout = function () {
            delete $localStorage.token;
            $rootScope.auth = false;
            $location.path("/");
        };

        $scope.signup = function () {
            authService.signup($scope.data, function (res) {
                res = res.data;

                if (res.status === 'success') {
                    Notification.success(res.message);
                    $localStorage.token = res.token;
                    checkAuth();
                    $location.path('/edit-profile/' + $rootScope.auth.data.id);
                } else {
                    Notification.error('Whoops! Something went wrong');
                }
            });
        };

        $scope.updatePassword = function () {
            authService.updatePassword($scope.data, function (res) {
                res = res.data;
                if (res.status === 'success') {
                    Notification.success(res.message);
                    $scope.data = {};
                } else {
                    Notification.error('Incorrect password, try again.')
                }
            }, function (res) {
                res = res.data;

                if (res.status_code === 422) {
                    /* I have added a reusable service to show form validation error from server side. */
                    serverValidationErrorService.display(res.errors);
                    Notification.error(res.message);
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
        };

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

