"use strict";

app.controller("ProfileController", function ($scope, $route, authService) {
	function run() {
		if ($route.current.method !== undefined) {
			var method = $route.current.method;
			$scope[method]();
		}
	}

	$scope.profile = function () {
		authService.profile(function (res) {
			res = res.data;

			if (res.status === "success") {
				$scope.user = res.results;
			} else {
				alert(res.message);
			}
		})
	}

	run();
});
