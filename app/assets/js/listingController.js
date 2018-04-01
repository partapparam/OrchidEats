(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('ListingController',
            function ($scope, $location, authService, Notification, $stateParams, $rootScope, $localStorage, $window) {
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
                        });
                        vm.order_rule = vm.listing.order_rule.split(',').map(Number).filter(Boolean);

                    } else {
                        Notification.error("Listing not found, please reload page.")
                    }
                    //check if order deadline has passed.
                    if (Date.parse(vm.listing.order_deadline) < Date.parse(vm.date)) {
                        vm.disabled = true;
                    }

                    vm.listing.meals.forEach(function (d) {
                        d.quantity = 0;
                    });
                });

                vm.cart = function () {
                    //requires user to create account. Will redirect back to this page after signup
                    if (!$localStorage.token) {
                        $window.location.replace('https://www.orchideats.com/signup?' + 'redirect_uri=' + vm.url);
                        Notification('You must create an account before placing an order.');
                    }

                    else {
                        //make sure user isn't chef. Chefs cant place orders.
                        if ($scope.auth.data.is_chef === 0) {
                            checkoutStart.carts_user_id = $scope.auth.data.id;
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
                            if (vm.order_rule) {
                                if (vm.order_rule.indexOf(vm.inCart) > -1) {
                                    minimum = true;
                                }
                                console.log(vm.inCart, vm.order_rule);
                            } else {
                                if (vm.inCart >= vm.listing.min_per_order) {
                                    minimum = true;
                                }
                                console.log(vm.inCart, vm.order_rule);
                            }

                            // Save cart to database
                            if (checkoutStart.details[0] && minimum) {
                                authService.cart.post(checkoutStart, function (res) {
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

                            }
                            else {
                                if (vm.order_rule) {
                                    Notification.error('The Chef requires ' + vm.order_rule + ' meals per order.');
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
                }
    });

})();