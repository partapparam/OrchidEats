"use strict";

angular.module('OrchidApp')
    .controller('EditProfileController',
        function ($scope, $state, authService, Notification, $location, $rootScope, serverValidationErrorService, $stateParams) {
            var vm = this;
            vm.user = null;
            vm.validation = {
                rules: {
                    first_name: {
                        required: true
                    },
                    last_name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    dob: {
                        required: true
                    },
                    phone: {
                        required: true
                    },
                    address: {
                        required: true
                    },
                    city: {
                        required: true
                    },
                    state: {
                        required: true
                    },
                    zip: {
                        required: true
                    },
                    bio: {
                        required: true
                    }
                },
                messages: {
                    first_name: 'First Name is required',
                    last_name: 'Last Name is required',
                    email: 'Email is required',
                    dob: 'Date of birth is required',
                    phone: 'Phone number is required',
                    address: 'Address is required',
                    city: 'City is required',
                    state: 'State is required',
                    zip: 'Zip code is required',
                    bio: 'Bio is required'
                }
            };
            vm.editProfile = editProfile;
            vm.update = update;
            var params = $stateParams.id;

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            function editProfile() {
                authService.editProfile.get(params, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.user = res.data;
                    } else {
                        Notification.error(res.message);
                    }
                });
            }

            function update(form) {
                if (form.validate()) {
                    authService.editProfile.post(vm.user, function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            if ($scope.auth.data.is_chef === 1) {
                                Notification('Profile updated.');
                                $location.path('/chef-dashboard');
                            } else {
                                Notification('Profile updated.');
                            }
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
                $rootScope.buttonDisabled = false;

            }

            run();
        });

