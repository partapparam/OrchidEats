"use strict";

angular.module('OrchidApp')
    .controller('AuthController', function ( $timeout, $scope, $rootScope, $state, authService, $localStorage, $location, Notification, $transitions, serverValidationErrorService) {
        $scope.data = {};
        $scope.data.is_chef = 1;
        var vm = this;
        vm.date = new Date();
        vm.redirect = $location.search().redirect_uri;

        $rootScope.$state = $state;

        //disables submit button to prvent double click
        $scope.submit = function() {
            $scope.buttonDisabled = true;
        };
        $scope.navCollapsed = true;

        //delays loading of footer - showFlag tag
        //could have function run in each controller after content is loaded.
        //Watches for location change to close nav bar
        $scope.$on('$locationChangeStart', function() {
            $scope.showFlag = false;
            $scope.navCollapsed = true;
            $timeout(function timeout()
            {
                $scope.showFlag = true;
            }, 1000);
        });

        if (vm.redirect) {
            $scope.data.is_chef = 0;
        }

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
                    Notification.error('Incorrect login, please try again');
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
                    if (vm.redirect) {
                        $location.path(vm.redirect);
                        $location.search('redirect_uri', null);
                    } else {
                        $location.path('/edit-profile/' + $rootScope.auth.data.id);
                    }
                } else {
                    Notification.error('Whoops! Something went wrong. Please try again');
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
                    $scope.buttonDisabled = false;
                    $state.go('login');
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

