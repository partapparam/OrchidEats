"use strict";
angular.module('OrchidApp')
	.controller("ProfileController", function ($scope, $route, authService) {
	function run() {
		if ($route.current.method !== undefined) {
			var method = $route.current.method;
			$scope[method]();
		}
	}

	$scope.profile = function () {
		authService.profile(function (res) {
			res = res.data;

            var vm = this;
            vm.user = {};

			if (res.status === "success") {
				vm.user = res.results;
			} else {
				alert(res.message);
			}
		})
	};

	run();
});
