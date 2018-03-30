"use strict";
angular.module('OrchidApp')
	.controller("ProfileController", function (Notification, $stateParams, $scope, $state, authService, $localStorage, $location, $window) {
        var vm = this;
        vm.user = null;
        vm.params = $stateParams.id;
        vm.url = $location.url();
        vm.profile = profile;
        vm.menu = 0;
        vm.open = false;
        vm.validation = {
            rules: {
                email: {
                    required: true,
                    email: true
                },
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                }
            },
            messages: {
                email: 'Email is required',
                first_name: 'First name is required',
                last_name: 'Last name is required'
            }
        };
        vm.new = {};

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
					vm.user = res.data[0];
					vm.menu = res.data[1];
				} else {
					Notification.error(res.message);
				}
			});
		}

		vm.sendMessage = function () {
            //if non user, send to signup before redirect back to page
            if (!$localStorage.token) {
                $window.location.replace('http://orchideats.test/signup?' + 'redirect_uri=' + vm.url);
                Notification.error('An account is required to send messages.');
            } else {
                Notification({message: 'You are being redirected to your inbox. Please wait.', delay: 4000});
                $localStorage.messageTo = vm.params;
                $location.path('/inbox/' + $scope.auth.data.id);
			}
		};

        vm.email = function (form) {
            if (form.validate()) {
                vm.new.chef_user_id = vm.params;
                authService.emailList.customer(vm.new, function (res) {
                    res = res.data;
                    console.log(res);
                    if (res.status === 'success') {
                        Notification('New email added!');
                        $state.reload();
                    } else if (res.status === 'error') {
                        Notification.error('Update failed, try again. ');
                        // $rootScope.buttonDisabled = false;

                    }
                    $rootScope.buttonDisabled = false;

                }, function (res) {
                    res = res.data;

                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                        $rootScope.buttonDisabled = false;
                    } else {
                        Notification.error('There was an error processing your request. Please re-submit.');
                        $rootScope.buttonDisabled = false;
                        $state.reload();
                    }
                });
            }
            else {
                $rootScope.buttonDisabled = false;
            }
        };

		run();
});
