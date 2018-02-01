"use strict";
angular.module('OrchidApp')
	.controller("ProfileController", function ($scope, $state, authService) {
        var vm = this;
        vm.user = {};

		function run() {
			if ($state.current.method !== undefined) {
				var method = $state.current.method;
				$scope[method]();
			}
		}

		$scope.profile = function () {
			authService.profile(function (res) {
				res = res.data;
				console.log(res);
				if (res.status === "success") {
					vm.user = res.data;
				} else {
					alert(res.message);
				}
			});
		};

		$scope.orderReqs = function() {
			authService.orderReqs.get(function (res) {
				res = res.data;
				// console.log(res.data);
				if (res.status === 'success') {
					vm.user = res.data;
					console.log(vm.user);
				} else {
					Notification.error('Try Again');
				}
			})
		};

		vm.update = function () {
			console.log(vm.user);
			authService.orderReqs.post(vm.user, function (res) {
				res = res.data;
				console.log(res.data);

				if (res.status === 'success') {
					Notification.success('Update Successful')
				}
			})
		};

		run();
});
