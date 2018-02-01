(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('ListingController',
            function ($scope, $location, authService, Notification, $stateParams, $localStorage, $state) {
                var vm = this;
                vm.listing = {};
                var checkoutStart = [];
                vm.inCart = {};
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
                    vm.listing.meals.forEach(function (d) {
                        d.quantity = 0;
                    });

                });

                $scope.cart = function () {
                    vm.listing.meals.forEach(function (d) {
                        if (d.quantity > 0) {
                            checkoutStart.push({
                                'meal_id': d.meal_id,
                                'meals_chef_id': d.meals_chef_id,
                                'price': d.price,
                                'quantity': d.quantity,
                                'user_id': $scope.auth.data.id,
                                'name': d.name
                            })
                        }
                    });

                    if (checkoutStart[0]) {
                        delete $localStorage.cart;
                        $localStorage.cart = checkoutStart;
                        $location.path('/marketplace-listing/' + vm.listing.chef_id + '/checkout');
                        console.log($localStorage.cart);

                    } else {
                        Notification.error('Your shopping cart is empty!');
                        $state.reload();
                    }
                };
        });

})();