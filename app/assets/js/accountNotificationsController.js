(function () {
    'use strict';

    angular.module('OrchidApp').controller('AccountNotificationController',


        function ($scope, $route, authService) {
        var vm = this;
        vm.user = {};

        function run() {
            if ($route.current.method !== undefined) {
                var method = $route.current.method;
                $scope[method]()
            }
        }

        $scope.accountNotifications = function () {
            authService.accountNotifications.get(function (res) {
                if (res.status === 'success') {
                    vm.user = res.data;
                } else {
                    alert(res.message);
                }
            })
        };

        $scope.update = function () {
          console.log(vm.user);
          authService.accountNotifications.post(vm.user);
        };

        run();
    })
})();