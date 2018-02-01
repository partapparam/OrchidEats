(function() {
    'use strict';

    angular.module('OrchidApp')
        .controller('AdminController',

            function ($scope, $state, authService, Notification) {
                var vm = this;
                vm.user = [];
                vm.order = [];
                vm.oneAtATime = false;
                var updated = [];


                function run() {
                    if ($state.current.method !== undefined) {
                        var method = $state.current.method;
                        $scope[method]()
                    }
                }

                $scope.users = function () {
                    authService.admin.users(function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.user = res.data;
                            console.log(vm.user);
                        } else {
                            Notification.error(res.message);
                        }
                    });
                };

                $scope.orders = function () {
                    authService.admin.orders(function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.order = res.data;
                            console.log(vm.order);
                        } else {
                            Notification.error(res.message);
                        }
                    });
                };

                vm.change = function (user) {
                    updated.push({
                                'id': user.id,
                                'is_chef': user.is_chef
                            });
                };

                vm.completed = function (order) {
                    updated.push({
                                'order_id': order.order_id,
                                'completed': order.completed
                            });
                };

                vm.update = function () {
                    console.log(updated);
                    if (updated[0].is_chef === 0 || updated[0].is_chef === 1) {
                        authService.admin.updateUsers(updated, function (res) {
                            console.log(res);
                            updated = [];
                            $state.reload();
                        })
                    } else if (updated[0].completed === 0 || updated[0].completed === 1) {
                        authService.admin.updateOrders(updated, function (res) {
                            console.log(res);
                            updated = [];
                            $state.reload();
                        })
                    }
                };

                vm.delete = function (user) {
                    authService.admin.delete(user.id, function (res) {
                        Notification.success(res.data.status);
                        $state.reload();
                    })
                };

                run();
            });
})();