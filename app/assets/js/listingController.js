(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('ListingController',
            function ($scope, authService, Notification, $stateParams) {
            var vm = this;
            vm.listing = {};

            var params = $stateParams.id;

            authService.listing.get(params, function (res) {
                res = res.data;

                if (res.status === 'success') {
                    vm.listing = res.data[0];
                    console.log(vm.listing);
                } else {
                    Notification.error('Listing not found.')
                }

                vm.listing.rating = parseFloat(vm.listing.rating).toFixed(2);

            });
        });

})();