(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('OrdersController',
            function ($scope, $state, authService, Notification, $rootScope, $localStorage, $location) {
                var vm = this;
                vm.pastOrder = null;
                vm.upcomingOrder = null;
                vm.incompleteOrder = null;
                vm.allOrder = null;
                vm.pastOrders = pastOrders;
                vm.upcomingOrders = upcomingOrders;
                vm.orderHistory = orderHistory;
                vm.currentOrders = currentOrders;
                vm.mark = false;
                vm.completed = completed;

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
                            vm.incompleteOrder.forEach(function (e) {
                                //makes it so only the div for the order will open to confirm form.
                                e.marked = false;
                            })
                        } else {
                            Notification.error(res.message);
                        }
                    })
                }

                function completed(order) {
                    authService.orders.completed(order, function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            Notification.success('Order update successful.');
                            $state.reload();
                        } else {
                            Notification.error(res.message);
                        }
                        $rootScope.buttonDisabled = false;
                    })
                }

                vm.sendMessage = function (id) {
                    Notification({message: 'You are being redirected to your inbox. Please wait.', delay: 4000});
                    $localStorage.messageTo = id;
                    $location.path('/inbox/' + $scope.auth.data.id);
                };

                run();
            });
})();