"use strict";
angular.module('OrchidApp')
	.controller("ProfileController", function ($stateParams, $scope, $state, authService, Notification, serverValidationErrorService) {
        var vm = this;
        vm.user = null;
        vm.params = $stateParams.id;
        vm.validation = {
            rules: {
                food_handler: {
                    required: true
                },
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
				},
                delivery_window: {
                    required: true
                },
                delivery_date: {
                    required: true
                },
				keto: {
                	required: true,
					digits: true
				},
                paleo: {
                    required: true,
                    digits: true
                },
                high_fat: {
                    required: true,
                    digits: true
                },
                low_carb: {
                    required: true,
                    digits: true
                },
                high_protein: {
                    required: true,
                    digits: true
                },
                vegan: {
                    required: true,
                    digits: true
                },
                vegetarian: {
                    required: true,
                    digits: true
                }
            },
            messages: {
                food_handler: 'Food handlers card is required',
                order_deadline: 'Order Deadline is required.',
                min_per_order: 'Minimum per order is required',
				oe_delivery: 'Delivery or pickup is required',
				pickup: 'Delivery or pickup is required'
            }
        };
        vm.date  = new Date();
        vm.profile = profile;
        vm.orderReqs = orderReqs;

        //prevents double click on submit buttons
        $scope.submit = function() {
            $scope.buttonDisabled = true;
        };


        function run() {
			if ($state.current.method !== undefined) {
				var method = $state.current.method;
				vm[method]();
			}
		}

		function profile () {
			authService.profile(vm.params, function (res) {
				res = res.data;
				if (res.status === "success") {
					vm.user = res.data;
				} else {
					alert(res.message);
				}
			});
		}

		function orderReqs() {
			authService.orderReqs.get(function (res) {
				res = res.data;
				if (res.status === 'success') {
					vm.user = res.data;
					if (Date.parse(vm.user.order_deadline) <= Date.parse(vm.date)) {
					    Notification.info('Please update your order deadline under Order Requirements. Your deadline has expired.')
                    }
                } else {
					Notification.error('Try Again');
				}
			})
		}

		vm.update = function (form) {
			if(form.validate()) {
                authService.orderReqs.post(vm.user, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        $scope.auth.data.order_deadline = res.data.order_deadline;
                        if (Date.parse(vm.user.order_deadline) <= Date.parse(vm.date)) {
                            Notification.info('Please update your order deadline under Order Requirements. Your deadline has expired.')
                        }
                        $scope.buttonDisabled = false;
                        Notification.success('Update Successful');
                    } else if (res.status === 'error') {
                        $scope.buttonDisabled = false;
                        Notification.error('Update unsuccessful')
                    }
                }, function (res) {
                    res = res.data;
                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                        $scope.buttonDisabled = false;
                        $state.reload();
                    }
                });
            }
		};

		run();
});
