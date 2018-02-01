(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('OrdersController',
            function ($scope, $state, authService) {
                var vm = this;
                vm.pastOrder = {};
                vm.upcomingOrder = {};
                vm.incompleteOrder = {};
                vm.allOrder = {};

                function run() {
                    if ($state.current.method !== undefined) {
                        var method = $state.current.method;
                        $scope[method]()
                    }
                }

                $scope.pastOrders = function () {
                    authService.orders.pastOrders(function (res) {
                        res = res.data;
                        // console.log(res);
                        if (res.status === 'success') {
                            vm.pastOrder = res.data[0];
                            console.log(vm.pastOrder);
                        } else {
                            Notification.error(res.message);
                        }
                    })
                };

                $scope.upcomingOrders = function () {
                    authService.orders.upcomingOrders(function (res) {
                        res = res.data;

                        if (res.status === 'success') {
                            vm.upcomingOrder = res.data[0];
                            console.log(vm.upcomingOrder);
                        } else {
                            Notification.error(res.message);
                        }
                    })
                };

                $scope.orderHistory = function () {
                    authService.orders.orderHistory(function (res) {
                        res = res.data;
                        // console.log(res.data);
                        if (res.status === 'success') {
                            vm.allOrder = res.data[0];
                            console.log(vm.allOrder);
                        } else {
                            Notification.error(res.message);
                        }
                    })
                };

                $scope.incompleteOrders = function () {
                    authService.orders.incompleteOrders(function (res) {
                        res = res.data;
                        // console.log(res.data);
                        if (res.status === 'success') {
                            vm.incompleteOrder = res.data[0];
                            console.log(vm.incompleteOrder);
                        } else {
                            Notification.error(res.message);
                        }
                    })
                };



                run();
            });
})();