(function () {
    'use strict';

    angular.module('OrchidApp').controller('AccountNotificationController',


        function ($scope, $state, authService) {
        var vm = this;
        vm.user = {};

        function run() {
            if ($state.current.method !== undefined) {
                var method = $state.current.method;
                $scope[method]()
            }
        }

        $scope.accountNotifications = function () {
            authService.accountNotifications.get(function (res) {
                res = res.data;

                if (res.status === 'success') {
                    vm.user = res.data[0];
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