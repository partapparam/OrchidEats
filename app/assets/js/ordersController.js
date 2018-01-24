(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('OrdersController',
            function ($scope, $state, authService) {
                var vm = this;
                vm.order = {};

                function run() {
                    if ($state.current.method !== undefined) {
                        var method = $state.current.method;
                        $scope[method]()
                    }
                }

                $scope.pastOrders = function () {
                    authService.pastOrders.get(function (res) {
                        if (res.status === 'success') {
                            vm.order = res.data;
                        } else {
                            alert(res.message);
                        }
                    })
                };

                $scope.upcomingOrders = function () {
                    authService.upcomingOrders.get(function (res) {
                        if (res.status === 'success') {
                            vm.order = res.data;
                        } else {
                            alert(res.message);
                        }
                    })
                };

                run();
            });


})();