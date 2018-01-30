(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('DashboardController',
            function ($scope, $state, authService, $location, Notification) {
                var vm = this;
                vm.data = {};
                var url = $location.absUrl();

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
                    })
                };

                $scope.authorize = function () {
                    authService.dashboard.stripeAuthorize().then(function (res) {
                        // Redirect to Stripe to start the Connect onboarding.
                        res.redirect('https://connect.stripe.com/express/oauth/authorize' + '?' + querystring.stringify(res));
                        if (url.toString().includes('code')) {
                            authService.dashboard.stripeToken(url).then(function (res) {
                                console.log(res);
                            })
                        }
                    }).catch(function error() {
                        console.log('error');
                    })
                };
                run();
            });
})();