"use strict";
angular.module('OrchidApp')
	.controller("ProfileController", function ($scope, $state, authService) {
        var vm = this;
        vm.user = {};

		// function run() {
		// 	if ($state.current.method !== undefined) {
		// 		var method = $state.current.method;
		// 		$scope[method]();
		// 	}
		// }

		// $scope.profile = function () {
			authService.profile(function (res) {
				res = res.data;
				if (res.status === "success") {
					vm.user = res.data[0];
				} else {
					alert(res.message);
				}
			})
		// };

		// run();
});
