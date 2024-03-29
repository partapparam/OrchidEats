(function () {
    'use strict';

    angular.module('OrchidApp').controller('AccountNotificationController',
        function ($scope, $state, authService, Notification, $rootScope, $stateParams, serverValidationErrorService) {
        var vm = this;
        vm.user = null;
        vm.accountNotifications = accountNotifications;
        vm.update = update;
        var params = $stateParams.id;
        vm.validation = {
            rules: {
                email_note: {
                    required: true
                },
                text_note: {
                    required: true
                }
            },
            messages: {
                email_note: 'Email notifications is required',
                text_note: 'Text notifications is required'
            }
        };

        function run() {
            if ($state.current.method !== undefined) {
                var method = $state.current.method;
                vm[method]()
            }
        }

        function accountNotifications() {
            authService.accountNotifications.get(params, function (res) {
                res = res.data;
                if (res.status === 'success') {
                    vm.user = res.data[0];
                } else {
                    Notification.error(res.message);
                }
            })
        }

        function update(form) {
            if (form.validate()) {
                authService.accountNotifications.post(vm.user, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        Notification('Account update successful!');
                    } else if (res.status === 'error') {
                        Notification.error('Update failed, try again. ');
                    }
                    $rootScope.buttonDisabled = false;
                }, function (res) {
                    res = res.data;

                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                        $state.reload();
                    } else {
                        Notification.error('There was an error processing your request. Please re-submit.');
                        $state.reload();
                    }
                    $rootScope.buttonDisabled = false;
                });
            } else {
                $rootScope.buttonDisabled = false;
            }
        }

        run();
    })
})();