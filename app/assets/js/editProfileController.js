"use strict";

angular.module('OrchidApp')
    .controller('EditProfileController',
        function ($scope, $state, authService) {
            var vm = this;
            vm.user = {};

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    $scope[method]()
                }
            }

            $scope.editProfile = function () {
                authService.editProfile.get(function (res) {
                    if (res.status === 'success') {
                        vm.user = res.data;
                    } else {
                        alert(res.message);
                    }
                })
            };

            $scope.update = function () {
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
            };
            run();
        });

