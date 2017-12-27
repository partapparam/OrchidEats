"use strict";

angular.module('OrchidApp')
    .controller('EditProfileController', [
        '$http',
        '$scope',

        function ($http, $scope) {
            var vm = this;
            vm.user = {};
            $http({method: "GET", url: window.api + "/users.php", headers: "Access-Control-Allow-Origin: *" })
                .then(function successCallback(response) {
                    vm.user = response.data[0];
                    console.log(vm.user);
                    return vm.user;
                }).catch(function errorCallback(response) {
                console.log(response.data);
                console.log("Error.");
            });

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
                    $http({method: 'POST', url: window.api + '/editProfile.php',
                        data: vm.user,	headers: {'Content-Type' : 'application/json'}
                    }).then(function success(data) {
                        console.log(data);
                    }).catch(function fail (data) {
                        console.log(data);
                    });
                }
            };
        }]);
