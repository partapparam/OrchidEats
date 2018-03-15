"use strict";
angular.module('OrchidApp')
    .controller("ChefSettingsController", function ($stateParams, $location, $rootScope, $scope, $state, authService, Notification, serverValidationErrorService) {
        var vm = this;
        vm.user = null;
        vm.params = $stateParams.id;
        vm.validation = {
            rules: {
                order_deadline: {
                    required: true,
                    date: true
                },
                min_per_order: {
                    required: true
                },
                oe_delivery: {
                    required: true,
                    digits: true
                },
                pickup: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                food_handler: 'Food handlers card is required',
                order_deadline: 'Order Deadline is required.',
                min_per_order: 'Minimum per order is required',
                delivery: 'Delivery or pickup is required',
                pickup: 'Delivery or pickup is required'
            }
        };
        vm.date  = new Date();
        vm.chefSettings = chefSettings;
        vm.redirect = $rootScope.redirectUri;

        function run() {
            if ($state.current.method !== undefined) {
                var method = $state.current.method;
                vm[method]();
            }
        }

        function chefSettings() {
            authService.chefSettings.get(function (res) {
                res = res.data;
                if (res.status === 'success') {
                    vm.user = res.data;
                    if (Date.parse(vm.user.order_deadline) <= Date.parse(vm.date)) {
                        Notification.info('Please update your order deadline. Your deadline has expired.')
                    }
                } else {
                    Notification.error('Try Again');
                }
            })
        }

        vm.update = function (form) {
            if(form.validate()) {
                authService.chefSettings.post(vm.user, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        // if (Date.parse(vm.user.order_deadline) <= Date.parse(vm.date)) {
                        //     Notification.info('Please update your order deadline. Your deadline has expired.')
                        // }
                        $rootScope.buttonDisabled = false;
                        Notification('Update Successful');
                        $state.reload();
                    } else if (res.status === 'error') {
                        $rootScope.buttonDisabled = false;
                        Notification.error('Update unsuccessful')
                    }
                }, function (res) {
                    res = res.data;
                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                        $rootScope.buttonDisabled = false;
                        $state.reload();
                    }
                });
            }
        };

        run();
    });