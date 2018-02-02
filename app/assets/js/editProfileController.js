"use strict";

angular.module('OrchidApp')
    .controller('EditProfileController',
        function ($scope, $state, authService, Notification, serverValidationErrorService) {
            var vm = this;
            vm.user = {};
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
                    gender: {
                        required: true
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
                    email: 'First Name is required',
                    gender: 'Gender is required',
                    dob: 'Date of birth is required',
                    phone: 'Phone number is required',
                    address: 'Address is required',
                    zip: 'Zip code is required',
                    bio: 'Bio is required',
                }
            };
            vm.editProfile = editProfile;
            vm.update = update;

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]()
                }
            }

            function editProfile() {
                authService.editProfile.get(function (res) {
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
                            Notification.success(res.message);
                        }
                    }, function (res) {
                        res = res.data;

                        if (res.status_code === 422) {
                            /* I have added a reusable service to show form validation error from server side. */
                            serverValidationErrorService.display(res.errors);
                            Notification.error(res.message);
                        }
                    });
                }
            }

            // $scope.editProfile = function () {
                /*authService.editProfile.get(function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.user = res.data[0];
                        console.log(vm.user);
                    } else {
                        Notification.error(res.message);
                    }
                });*/
            // };

            /*$scope.update = function () {
                if (vm.user.first_name === null) {
                    alert("Enter your First Name");
                } else if (vm.user.last_name === null) {
                    alert("Enter your Last Name");
                } else if (vm.user.email === null) {
                    alert("Enter your Email");
                } else if (vm.user.gender === null) {
                    alert("Choose your gender");
                } else if (vm.user.dob === null) {
                    alert("Enter your birthday");
                } else if (vm.user.phone === null) {
                    alert("Enter your phone number");
                } else if (vm.user.address === null) {
                    alert("Enter your address");
                } else if (vm.user.zip === null) {
                    alert("Enter your Zip Code");
                } else if (vm.user.bio === null) {
                    alert("Enter your bio");
                } else {
                    console.log(vm.user);
                    authService.editProfile.post(vm.user);
                }
            };*/
            run();
        });

