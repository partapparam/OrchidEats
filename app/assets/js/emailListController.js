"use strict";
angular.module('OrchidApp')
    .controller("EmailListController", function (Notification, $stateParams, $scope, $rootScope, $state, authService, serverValidationErrorService) {
        var vm = this;
        vm.emails = null;
        vm.new = {};
        vm.emailList = emailList;
        vm.update = update;
        vm.open = false;
        vm.sendOpen = false;
        vm.params = $stateParams.id;
        vm.validation = {
            rules: {
                email: {
                    required: true,
                    email: true
                },
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                }
            },
            messages: {
                email: 'Email is required',
                first_name: 'First name is required',
                last_name: 'Last name is required'
            }
        };
        vm.email = [];

        function run() {
            if ($state.current.method !== undefined) {
                var method = $state.current.method;
                vm[method]();
            }
        }

        function emailList() {
            authService.emailList.get(function(res) {
                res = res.data;
                if (res.status === 'success') {
                    vm.emails = res.data.emails;
                    vm.emails.forEach(function(e) {
                        e.selected = 0;
                        e.updated_at = Date.parse(e.updated_at);
                    })
                } else {
                    Notification.error(res.message);
                }
            });
        }

        function update (form) {
            if (form.validate()) {
                authService.emailList.post(vm.new, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        Notification.success('New email added!');
                        $rootScope.buttonDisabled = false;
                        $state.reload();
                    } else if (res.status === 'error') {
                        Notification.error('Update failed, try again. ');
                        $rootScope.buttonDisabled = false;
                    }
                }, function (res) {
                    res = res.data;

                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                        $rootScope.buttonDisabled = false;
                    } else {
                        Notification.error('There was an error processing your request. Please re-submit.');
                        $rootScope.buttonDisabled = false;
                        $state.reload();
                    }
                });
            }
            else {
                $rootScope.buttonDisabled = false;
            }
        }

        vm.change = function (email) {
            vm.email.unshift({
                'email': email.email,
                'name': email.first_name,
                'selected': email.selected
            });
            //pushes to front of array and using underscore _.uniq, any copies get removed. prevents from sending email twice or if email is accidently selected.
            vm.email = _.uniq(vm.email, 'email');
        };

        vm.send = function () {
            authService.emailList.send(vm.email, function(res) {
            res = res.data;
                if (res.status === 'success') {
                  Notification.success('Email sent.');
                  $rootScope.buttonDisabled = false;
                  $state.reload();
                } else if (res.status === 'error') {
                  Notification.error('Failed, try again. ');
                  $rootScope.buttonDisabled = false;
                }
            });
        };

        vm.delete = function (email) {
            authService.emailList.delete(email.email_id, function (res) {
                Notification.success(res.data.message);
                $state.reload();
            })
        };

        run();

    });
