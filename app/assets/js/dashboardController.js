(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('DashboardController',
            function ($scope, $window, $state, authService, $location, Notification) {
                var vm = this;
                vm.data = null;
                var url = $location.url();
                vm.date = new Date();

                //below is for star rating settings
                vm.max = 5;
                vm.isReadonly = false;
                vm.dashboard = dashboard;
                vm.authorize = authorize;

                function run() {
                    if ($state.current.method !== undefined) {
                        var method = $state.current.method;
                        vm[method]()
                    }
                }

                function dashboard() {
                    authService.dashboard.get(function (res) {
                        res = res.data;
                        // console.log(res.data);
                        if (res.status === 'success') {
                            vm.data = res.data;
                            if (Date.parse(vm.data.order_deadline) <= Date.parse(vm.date)) {
                                vm.data.order_deadline = Date.parse(vm.data.order_deadline);
                                vm.date = Date.parse(vm.date);
                            }
                            console.log(vm.data);
                        } else {
                            Notification.error(res.message);
                        }
                    });
                };

                //Gets user token from stripe after redirect back.
                //This gets the code from url string
                if (url.toString().includes('code')) {
                    var data = [];
                    var SearchString = url.substring(1);
                    var VariableArray = SearchString.split('&');
                    for(var i = 0; i < VariableArray.length; i++){
                        var KeyValuePair = VariableArray[i].split('=');
                        data.push(KeyValuePair[1]);
                    }
                    console.log(data);

                    authService.dashboard.stripeToken(data, function (res) {
                        res = res.data;
                        console.log(res);
                        if (res.status === "success") {
                            $scope.logout();
                            Notification.success('Stripe account created. Please login again to save changes to your account.');
                        } else if (res.status === 'error') {
                            Notification.error('Unsuccessful');
                        }
                    });
                }

                function authorize() {
                    authService.dashboard.stripeAuthorize(function (res) {
                        // Redirect to Stripe to start the Connect onboarding.
                        res = res.data.data;
                        console.log('redirect_uri=' + res.redirect_uri + '&client_id=' + res.client_id + '&state=' + res.state + '&stripe_user[business_type]=' + res.business_type);

                        $window.location.replace('https://connect.stripe.com/express/oauth/authorize?' + 'redirect_uri=' + res.redirect_uri + '&client_id=' + res.client_id + '&state=' + res.state);
                    })
                };

                run();
            });
})();