(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('ListingController',
            function ($scope, $location, authService, Notification, $stateParams) {
                var vm = this;
                vm.listing = null;
                var checkoutStart = {};
                vm.inCart = 0;
                var params = $stateParams.id;
                vm.subtotal = 0;

                //uib carousel setup
                vm.myInterval = 5000;
                vm.noWrapSlides = false;
                vm.active = 0;
                vm.slides = [];
                vm.currIndex = 0;
                vm.addSlide = function() {
                    var newWidth = 400 + vm.slides.length + 1;
                    vm.slides.push({
                        image: '//unsplash.it/' + newWidth + '/300',
                        id: vm.currIndex++
                    });
                };
                for (var i = 0; i < 4; i++) {
                    vm.addSlide();
                }

                //To check if order_deadline has passed. If so, ng-disable the proceed to payment button and show warning that order_deadline has passed.
                vm.date = new Date();
                vm.disabled = false;
                vm.validation = {
                    rules: {
                        quantity: {
                            digits: true
                        }
                    },
                    messages: {
                        quantity: 'Please input a numerical quantity'
                    }
                };


                authService.listing.get(params, function (res) {
                    res = res.data;

                    if (res.status === 'success') {
                        vm.listing = res.data[0];
                        console.log(vm.listing);
                    } else {
                        Notification.error("Listing not found, please reload page.")
                    }
                    //check if order deadline has passed.
                    if (Date.parse(vm.listing.order_deadline) < Date.parse(vm.date)) {
                        vm.disabled = true;
                        console.log(vm.disabled);
                    }

                    vm.listing.meals.forEach(function (d) {
                        d.quantity = 0;
                    });
                });

                vm.cart = function () {
                    //make sure user isn't chef. Chefs cant place orders.
                    if ($scope.auth.data.is_chef === 0) {
                        checkoutStart.carts_user_id = $scope.auth.data.id;
                        checkoutStart.carts_chef_id = params;
                        checkoutStart.chefs_order_deadline = vm.listing.order_deadline;
                        checkoutStart.details = [];
                        vm.listing.meals.forEach(function (d) {
                            if (d.quantity > 0) {
                                checkoutStart.details.push({
                                    'meal_id': d.meal_id,
                                    'meals_chef_id': d.meals_chef_id,
                                    'price': d.price,
                                    'quantity': d.quantity,
                                    'name': d.name
                                })
                            }
                            vm.inCart = vm.inCart + d.quantity;
                        });

                        //Makes sure chef meals/order minimum is met
                        var minimum = false;
                        if (vm.inCart >= vm.listing.min_per_order) {
                            minimum = true;
                        }
                        //Save cart to database
                        if (checkoutStart.details[0] && minimum) {
                            console.log(checkoutStart);
                            authService.cart.post(checkoutStart, function (res) {
                                res = res.data;

                                if (res.status === 'success') {
                                    //changes cart in navbar so it is active.
                                    $scope.auth.data.cart = vm.listing.chef_id;
                                    $location.path('/marketplace-listing/' + vm.listing.chef_id + '/checkout');
                                    console.log(res.message);
                                }
                            }, function (res) {
                                res = res.data;

                                if (res.status_code === 422) {
                                    /* I have added a reusable service to show form validation error from server side. */
                                    serverValidationErrorService.display(res.errors);
                                    Notification.error(res.message);
                                }
                            });

                        }
                        else {
                            console.log(vm.inCart);
                            Notification.error('The Chef requires a minimum of ' + vm.listing.min_per_order + ' meals per order. Please add more meals to your cart.');
                        }

                    } else if ($scope.auth.data.is_chef === 1) {
                        Notification.error('A chef cannot place an order. Please sign into a customer account to place an order. ')
                    }
                };
    });

})();