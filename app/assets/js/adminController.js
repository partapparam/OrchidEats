(function() {
    'use strict';

    angular.module('OrchidApp')
        .controller('AdminController',

            function ($scope, $state, authService, Notification) {
                var vm = this;
                vm.user = [];

                authService.admin.get(function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.user = res.data;
                        console.log(vm.user);
                    } else {
                        Notification.error(res.message);
                    }
                });
                var updated = [];

                vm.change = function (user) {
                    updated.push({
                                'id': user.id,
                                'is_chef': user.is_chef
                            });
                };

                vm.update = function () {
                    console.log(updated);
                    authService.admin.post(updated, function (res) {
                        console.log(res);
                        updated = [];
                    })
                }

            });
})();