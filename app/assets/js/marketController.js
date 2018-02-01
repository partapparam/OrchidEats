angular.module('OrchidApp')
    .controller('MarketController',
        function ($scope, $http, authService, Notification) {
            var vm = this;
            vm.listing = {};

            authService.marketplace(function (res) {
                res = res.data;
                // console.log(res);
                if (res.status === 'success') {
                    vm.listing = res.data;
                    console.log(vm.listing);
                } else {
                    Notification.error(res.message);
                }
                vm.listing.forEach(function (d) {
                    d.price = Math.ceil(d.price);
                    d.rating = parseFloat(d.rating).toFixed(2);
                });
            });

    });