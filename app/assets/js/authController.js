"use strict";

angular.module('OrchidApp')
    .controller('AuthController', function ( $timeout, $scope, $rootScope, $state, authService, $localStorage, $location, Notification, $transitions, serverValidationErrorService) {
        $scope.data = {};
        $scope.data.is_chef = 1;
        var vm = this;
        vm.date = new Date();
        vm.redirect = $location.search().redirect_uri;
        $rootScope.$state = $state;

        //disables submit button to prveent double click
        $scope.submit = function() {
            $rootScope.buttonDisabled = true;
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

        $scope.$on('$locationChangeSuccess', function() {
            $rootScope.buttonDisabled = false;
        });

        if (vm.redirect === '') {
            $scope.data.is_chef = 0;
            Notification.error('You must create an account before placing an order.');
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
                    $rootScope.buttonDisabled = false;
                } else if (res.status === 'success') {
                    $localStorage.token = res.data;
                    $rootScope.buttonDisabled = false;
                    checkAuth();
                    //redirect after chef signups for stripe
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
                    $rootScope.buttonDisabled = false;
                    $state.reload();
                }
                else {
                    Notification.error('There was an error processing your request. Please re-submit.');
                    $rootScope.buttonDisabled = false;
                    $state.reload();
                }
            });
        };

        $scope.logout = function () {
            delete $localStorage.token;
            $rootScope.auth = false;
            $location.path("/login");
        };

        $scope.signup = function () {
            authService.signup($scope.data, function (res) {
                res = res.data;

                if (res.status === 'success') {
                    $localStorage.token = res.token;
                    checkAuth();
                    $rootScope.buttonDisabled = false;
                    if (vm.redirect) {
                        $location.path(vm.redirect);
                        Notification('Success! Your account has been created.');
                        $location.search('redirect_uri', null);
                    } else {
                        //this will start the chef sign up process to walk them through it.
                        if ($rootScope.auth.data.is_chef === 1) {
                            Notification({message: 'Success! Fill out the details below to setup your profile.', delay: 10000});
                            $location.path('edit-profile/' + $rootScope.auth.data.id);
                        } else {
                            Notification('Success! Fill out the details below to setup your profile.');
                            $location.path('/edit-profile/' + $rootScope.auth.data.id);
                        }
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
                    $rootScope.buttonDisabled = false;
                    $state.reload();
                } else {
                    Notification.error('There was an error processing your request. Please re-submit.');
                    $rootScope.buttonDisabled = false;
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
                        $rootScope.buttonDisabled = false;
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
                        $rootScope.buttonDisabled = false;
                        $state.reload();
                    } else {
                        Notification.error('There was an error processing your request. Please re-submit.');
                        $rootScope.buttonDisabled = false;
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
                    $rootScope.buttonDisabled = false;
                    $state.reload();
                } else {
                    Notification.error('There was an error processing your request. Please re-submit.');
                    $rootScope.buttonDisabled = false;
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
                    $rootScope.buttonDisabled = false;
                    $state.go('login');
                }
            }, function (res) {
                res = res.data;

                if (res.status_code === 422) {
                    /* I have added a reusable service to show form validation error from server side. */
                    serverValidationErrorService.display(res.errors);
                    Notification.error(res.message);
                    $scope.data = {};
                    $rootScope.buttonDisabled = false;
                    $state.reload();
                } else {
                    Notification.error('There was an error processing your request. Please re-submit.');
                    $rootScope.buttonDisabled = false;
                    $state.reload();
                }
            });
        }
    });

