(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('OrdersController',
            function ($scope, $state, authService) {
                var vm = this;
                vm.pastOrder = null;
                vm.upcomingOrder = null;
                vm.incompleteOrder = null;
                vm.allOrder = null;
                vm.pastOrders = pastOrders;
                vm.upcomingOrders = upcomingOrders;
                vm.orderHistory = orderHistory;
                vm.currentOrders = currentOrders;

                //prevents double click on submit buttons
                $scope.submit = function() {
                    $scope.buttonDisabled = true;
                };

                function run() {
                    if ($state.current.method !== undefined) {
                        var method = $state.current.method;
                        vm[method]()
                    }
                }

                function pastOrders () {
                    authService.orders.pastOrders(function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.pastOrder = res.data[0];
                        } else {
                            Notification.error(res.message);
                        }
                    })
                }

                function upcomingOrders () {
                    authService.orders.upcomingOrders(function (res) {
                        res = res.data;

                        if (res.status === 'success') {
                            vm.upcomingOrder = res.data[0];
                        } else {
                            Notification.error(res.message);
                        }
                    })
                }

                function orderHistory () {
                    authService.orders.orderHistory(function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.allOrder = res.data[0];
                        } else {
                            Notification.error(res.message);
                        }
                    })
                }

                function currentOrders () {
                    authService.orders.currentOrders(function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.incompleteOrder = res.data[0];
                        } else {
                            Notification.error(res.message);
                        }
                    })
                }

                run();
            });
})();