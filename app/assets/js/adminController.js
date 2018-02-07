(function() {
    'use strict';

    angular.module('OrchidApp')
        .controller('AdminController',

            function ($scope, $state, authService, Notification) {
                var vm = this;
                vm.user = [];
                vm.order = [];
                vm.deliveries = [];
                vm.oneAtATime = false;
                var updated = [];
                vm.users = users;
                vm.orders = orders;
                vm.delivery = delivery;


                function run() {
                    if ($state.current.method !== undefined) {
                        var method = $state.current.method;
                        vm[method]()
                    }
                }

                function users() {
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

                function orders() {
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

                function delivery() {
                    authService.admin.delivery(function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.deliveries = res.data;
                            console.log(vm.delivery);
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

                vm.delivered = function (delivery) {
                    updated.push({
                                'delivery_id': delivery.delivery_id,
                                'completed': delivery.completed,
                                'driver': delivery.driver
                            });
                };

                vm.completed = function (order) {
                    updated.push({
                                'order_id': order.order_id,
                                'completed': order.completed,
                            });
                };

                vm.admin = function (user) {
                  updated.push({
                      'id': user.id,
                      'is_admin': user.is_admin
                  })
                };

                vm.update = function () {
                    if (updated[0].is_chef != null) {
                        authService.admin.updateUsers(updated, function (res) {
                            res = res.data;
                            if (res.status === 'success') {
                                console.log(res);
                                updated = [];
                                Notification.success('Updated users.');
                            } else {
                                Notification.error('failed');
                            }
                        })
                    } else if (updated[0].order_id != null) {
                        authService.admin.updateOrders(updated, function (res) {
                            res = res.data;
                            if (res.status === 'success') {
                                console.log(res);
                                updated = [];
                                Notification.success('Updated Orders.');
                            } else {
                                Notification.error('failed');
                            }
                        })
                    } else if (updated[0].is_admin != null) {
                        authService.admin.updateAdmin(updated, function (res) {
                            res = res.data;
                            if (res.status === 'success') {
                                console.log(res);
                                updated = [];
                                Notification.success('Updated admins.');
                            } else {
                                Notification.error('failed');
                            }
                        })
                    } else if (updated[0].delivery_id != null) {
                        authService.admin.updateDelivery(updated, function (res) {
                            res = res.data;
                            if (res.status === 'success') {
                                console.log(res);
                                updated = [];
                                Notification.success('Updated deliveries');
                            } else {
                                Notification.error('failed');
                            }
                        })
                    }
                };

                vm.delete = function (user) {
                    authService.admin.delete(user.id, function (res) {
                        Notification.success(res.data.status);
                        $state.reload();
                    })
                };

                vm.cancel = function (order) {
                    authService.admin.cancel(order, function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            Notification.success('Order canceled.');
                            $state.reload();
                        }
                    })
                };

                run();
            });
})();