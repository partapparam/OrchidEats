(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('DashboardController',
            function ($scope, $window, $state, authService, $location, Notification) {
                var vm = this;
                vm.data = {};
                var url = $location.url();

                //below is for star rating settings
                vm.max = 5;
                vm.isReadonly = false;

                function run() {
                    if ($state.current.method !== undefined) {
                        var method = $state.current.method;
                        $scope[method]()
                    }
                }

                $scope.dashboard = function () {
                    authService.dashboard.get(function (res) {
                        res = res.data;
                        // console.log(res.data);
                        if (res.status === 'success') {
                            vm.data = res.data;
                            console.log(vm.data);
                        } else {
                            Notification.error(res.message);
                        }
                    });

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
                            console.log(res.data);
                            Notification.success('Stripe account created. Please login again to save the changes.');
                            delete $localStorage.token;
                            $rootScope.auth = false;
                            $location.path("/");
                        })
                    }
                };

                $scope.authorize = function () {
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