(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('ListingController',
            function ($scope, $location, authService, Notification, $stateParams, $rootScope, $localStorage) {
                var vm = this;
                vm.listing = null;
                var checkoutStart = {};
                vm.inCart = 0;
                vm.params = $stateParams.id;
                vm.subtotal = 0;
                vm.url = $location.url();

                //uib carousel setup
                vm.myInterval = 5000;
                vm.noWrapSlides = false;
                vm.active = 0;
                vm.slides = [];
                vm.currIndex = 0;
                vm.addSlide = function(i) {
                    vm.slides.push({
                        image: i.url,
                        id: vm.currIndex++
                    });
                };

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


                authService.listing.get(vm.params, function (res) {
                    res = res.data;

                    if (res.status === 'success') {
                        vm.listing = res.data[0];
                        vm.disabled = vm.listing.expired;
                        vm.listing.galleries.forEach(function (e) {
                            vm.addSlide(e);
                        });
                        vm.listing.meals.forEach(function (e) {
                            e.request = null;
                            e.quantity = 0;
                        });
                    } else {
                        Notification.error("Listing not found, please reload page.")
                    }
                });

                vm.saveCart = function(data) {
                    authService.cart.post(data, function (res) {
                        res = res.data;

                        if (res.status === 'success') {
                            $rootScope.buttonDisabled = false;
                            $location.path('/checkout');
                        }
                    }, function (res) {
                        res = res.data;

                        if (res.status_code === 422) {
                            /* I have added a reusable service to show form validation error from server side. */
                            serverValidationErrorService.display(res.errors);
                            Notification.error(res.message);
                            $rootScope.buttonDisabled = false;
                            $state.reload();
                        }
                    });
                };

                vm.cart = function () {
                    //chef cant place order and if not signed in
                    if (!$localStorage.token || $scope.auth.data.is_chef !== 1) {
                        if ($localStorage.token) {
                            checkoutStart.carts_user_id = $scope.auth.data.id;
                        }
                        checkoutStart.carts_chef_id = vm.listing.chef_id;
                        checkoutStart.details = [];
                        vm.listing.meals.forEach(function (d) {
                            if (d.quantity > 0) {
                                checkoutStart.details.push({
                                    'meal_id': d.meal_id,
                                    'meals_chef_id': d.meals_chef_id,
                                    'price': d.price,
                                    'quantity': d.quantity,
                                    'name': d.name,
                                    'request': d.request
                                })
                            }
                            vm.inCart = vm.inCart + d.quantity;
                        });

                        //Makes sure chef meals/order minimum is met
                        var minimum = false;
                        if (vm.listing.order_rule) {
                            vm.listing.order_rule.forEach(function (e) {
                                if (e.meals != null) {
                                    if (e.meals === vm.inCart) {
                                        checkoutStart.total = e.price;
                                        minimum = true;
                                    }
                                }
                            });
                        } else {
                            if (vm.inCart >= vm.listing.min_per_order) {
                                minimum = true;
                            }
                        }

                        // Save cart to database
                        if (checkoutStart.details[0] && minimum) {
                            //if user, save to database
                            if ($localStorage.token) {
                                vm.saveCart(checkoutStart);
                            }
                            //else use localstorage
                            else {
                                $localStorage.cart = checkoutStart;
                                $rootScope.buttonDisabled = false;
                                $location.path('/checkout');
                            }
                        }
                        else {
                            if (vm.listing.order_rule) {
                                Notification.error('Please match the chef\'s required meals per order.');
                                vm.inCart = 0;
                            } else {
                                Notification.error('The Chef requires a minimum of ' + vm.listing.min_per_order + ' meals per order. Please add more meals to your cart.');
                                vm.inCart = 0;

                            }
                            $rootScope.buttonDisabled = false;
                        }

                    //prevents ordering if you are a chef
                    } else if ($scope.auth.data.is_chef === 1) {
                        Notification.error('A chef cannot place an order. Please sign into a customer account to place an order. ');
                        $rootScope.buttonDisabled = false;
                    }
                }
    });

})();