"use strict";

angular.module('OrchidApp')
    .controller('AuthController', function ($scope, $rootScope, authService, $localStorage, $location, Notification, $transitions, serverValidationErrorService) {
        $scope.data = {};
        var vm = this;
        vm.date = new Date();

        $scope.submit = function() {
            $scope.buttonDisabled = true;
        };

        $scope.navCollapsed = true;
        $transitions.onSuccess({}, function () {
            $scope.navCollapsed = true;
        });

        function checkAuth() {
            if ($localStorage.token) {
                $rootScope.auth = authService.getClaimsFromToken($localStorage.token);
            }
        }

        checkAuth();

        $scope.login = function () {
            authService.login($scope.data, function (res) {
                res = res.data;

                if (res.status === 'error') {
                    Notification.error("Incorrect login. Try Again");
                } else if (res.status === 'success') {
                    $localStorage.token = res.data;
                    $scope.buttonDisabled = false;
                    checkAuth();
                    if ($scope.auth.data.is_chef === 0) {
                        $location.path('/upcoming-orders/' + $scope.auth.data.id);
                    } else if ($scope.auth.data.is_chef === 1) {
                        $location.path('/chef-dashboard');
                    }
                }
            }, function (res) {
                res = res.data;

                if (res.status_code === 422) {
                    /* I have added a reusable service to show form validation error from server side. */
                    serverValidationErrorService.display(res.errors);
                    Notification.error(res.message);
                    $scope.data = {};
                    $scope.buttonDisabled = false;
                    $state.reload();
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
                    $scope.buttonDisabled = false;
                    $location.path('/edit-profile/' + $rootScope.auth.data.id);
                } else {
                    Notification.error('Whoops! Something went wrong');
                }
            }, function (res) {
                res = res.data;

                if (res.status_code === 422) {
                    /* I have added a reusable service to show form validation error from server side. */
                    serverValidationErrorService.display(res.errors);
                    Notification.error(res.message);
                    $scope.data = {};
                    $scope.buttonDisabled = false;
                    $state.reload();
                }
            });
        };

        $scope.updatePassword = function () {
                authService.updatePassword($scope.data, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        Notification.success(res.message);
                        $scope.data = {};
                        $scope.buttonDisabled = false;
                    } else {
                        Notification.error('Incorrect password');
                    }
                }, function (res) {
                    res = res.data;

                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                        $scope.data = {};
                        $scope.buttonDisabled = false;
                        $state.reload();
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
                    /* I have added a reusable service to show form validation error from server side. */
                    serverValidationErrorService.display(res.errors);
                    Notification.error(res.message);
                    $scope.data = {};
                    $scope.buttonDisabled = false;
                    $state.reload();
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
                    /* I have added a reusable service to show form validation error from server side. */
                    serverValidationErrorService.display(res.errors);
                    Notification.error(res.message);
                    $scope.data = {};
                    $scope.buttonDisabled = false;
                    $state.reload();
                }
            });
        }
    });

