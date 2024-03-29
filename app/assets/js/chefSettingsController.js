"use strict";
angular.module('OrchidApp')
    .controller("ChefSettingsController", function ($stateParams, $location, $rootScope, $scope, $state, authService, Notification, serverValidationErrorService) {
        var vm = this;
        vm.user = null;
        vm.params = $stateParams.id;
        vm.needUpdate = false;
        vm.validation = {
            rules: {
                order_deadline: {
                    required: true,
                    date: true
                },
                delivery: {
                    required: true,
                    digits: true
                },
                pickup: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                order_deadline: 'Order Deadline is required.',
                delivery: 'Delivery or pickup is required',
                pickup: 'Delivery or pickup is required'
            }
        };
        vm.date  = new Date();
        vm.date = Date.parse(vm.date);
        vm.chefSettings = chefSettings;

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
                    if (Date.parse(vm.user.order_deadline) <= vm.date || Date.parse(vm.user.delivery_date) <= vm.date || Date.parse(vm.user.pickup_date) <= vm.date) {
                        vm.needUpdate = true;
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
                        //checks to see if chef dates are expired.
                        if (Date.parse(vm.user.order_deadline) <= vm.date || Date.parse(vm.user.delivery_date) <= vm.date || Date.parse(vm.user.pickup_date) <= vm.date) {
                            vm.needUpdate = true;
                        }
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
                    } else {
                        Notification.error('There was an error processing your request. Please re-submit.');
                        $rootScope.buttonDisabled = false;
                        $state.reload();
                    }
                });
            }
        };

        run();
    });
