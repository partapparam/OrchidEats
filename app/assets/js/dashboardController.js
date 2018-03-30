(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('DashboardController',
            function ($scope, $window, $state, authService, $rootScope, $location, Notification, $localStorage) {
                var vm = this;
                vm.data = null;
                var url = $location.url();
                vm.date = new Date();

                //below is for star rating settings
                vm.max = 5;
                vm.isReadonly = false;
                vm.dashboard = dashboard;
                vm.authorize = authorize;
                vm.link = link;
                vm.process = false;

                function run() {
                    if ($state.current.method !== undefined) {
                        var method = $state.current.method;
                        vm[method]()
                    }
                }

                function dashboard() {
                    authService.dashboard.get(function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.data = res.data;
                            vm.data.order_deadline = Date.parse(vm.data.order_deadline);
                            vm.date = Date.parse(vm.date);
                            vm.data.feedback.forEach(function(e) {
                                e.created_at = Date.parse(e.created_at);
                            });
                        } else {
                            Notification.error(res.message);
                        }
                    }, function (res) {
                        res = res.data;
                        Notification.error({message: 'There was an error. Please reload the page or log in again.', delay: 10000});
                    });
                }

                //Gets user token from stripe after redirect back.
                //This gets the code from url string
                if (url.toString().includes('code')) {
                    vm.process = true;
                    var data = [];
                    var SearchString = url.substring(1);
                    var VariableArray = SearchString.split('&');
                    for(var i = 0; i < VariableArray.length; i++){
                        var KeyValuePair = VariableArray[i].split('=');
                        data.push(KeyValuePair[1]);
                    }
                    //This removes queries from url so this function will only get run once.
                    $location.search({});

                    authService.dashboard.stripeToken(data, function (res) {
                        res = res.data;
                        if (res.status === "success") {
                            Notification({message: 'Success! Your Stripe account is setup. Please log in to' +
                                ' save' +
                                ' changes to your account.', delay: 10000});
                            vm.process = false;
                            $localStorage.settingRedirect = '/chef-settings/' + $scope.auth.data.id;
                            $scope.logout();
                        } else if (res.status === 'error') {
                            Notification.error('Unsuccessful');
                        }
                    }, function (res) {
                        res = res.data;

                        if (res.status_code === 422) {
                            /* I have added a reusable service to show form validation error from server side. */
                            serverValidationErrorService.display(res.errors);
                            Notification.error(res.message);
                            $rootScope.buttonDisabled = false;
                            $state.reload();
                        } else {
                            Notification.error('There was an error processing your request. Please re-submit.');
                            $rootScope.buttonDisabled = false;
                            $state.reload();
                        }
                    });
                }

                function authorize() {
                    authService.dashboard.stripeAuthorize(function (res) {
                        // Redirect to Stripe to start the Connect onboarding.
                        res = res.data.data;
                        vm.process = true;
                        $window.location.replace('https://connect.stripe.com/express/oauth/authorize?' + 'redirect_uri=' + res.redirect_uri + '&client_id=' + res.client_id + '&state=' + res.state);
                    });
                }

                //get link to connected express account dashboard
                function link() {
                    authService.dashboard.loginLink(function (res) {
                        $window.location.replace(res.data.data);
                        $rootScope.buttonDisabled = false;
                    })
                }

                run();
            });
})();