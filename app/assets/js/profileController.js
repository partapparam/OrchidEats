"use strict";
angular.module('OrchidApp')
	.controller("ProfileController", function (Notification, $stateParams, $scope, $state, authService) {
        var vm = this;
        vm.user = null;
        vm.params = $stateParams.id;
        vm.profile = profile;

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
					Notification.error(res.message);
				}
			});
		}

		run();
});
