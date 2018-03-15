"use strict";

angular.module('OrchidApp')
    .controller('WebhookController',
        function ($scope, $state, authService, Notification, $location, $rootScope, serverValidationErrorService, $stateParams) {
            var vm = this;
            vm.info = null;
            vm.webhook = webhook;

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            function webhook() {
                authService.webhook(function (res) {
                    res = res.data;
                    console.log(res);
                    if (res.status === 'success') {
                        vm.info = res;
                    }
                });
            }

            run();
    });


