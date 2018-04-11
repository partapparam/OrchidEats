(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('CheckoutController', function ($state, $scope, $location, $rootScope, authService, $localStorage, Notification, $stateParams) {
            var vm = this;
            vm.carts = null;
            vm.order = {};
            vm.total = 0;
            vm.quantity = 0;
            vm.subtotal = 0;
            vm.deliveryFee = 0;
            vm.serviceFee = 0.99;
            vm.source = false;
            vm.params = $stateParams.id;
            vm.getCart = getCart;
            vm.order.customer_details = {};
            vm.order.customer_details.delivery = null;
            vm.order.customer_details.instructions = null;
            //hides the page after the user clicks on the order button.
            vm.process = false;
            vm.noRemove = false;
            vm.checked = false;
            //for people getting here direct from chef email.
            vm.userEmail = $location.search().email;
            vm.userFirst = $location.search().first;
            vm.userLast = $location.search().last;

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            //changes price depending on if user selects delivery or not.
            $scope.price = function () {
                if (vm.checked) {
                    vm.serviceFee = 0;
                } else if (!vm.checked) {
                    vm.serviceFee = 0.99;
                }
                if (vm.order.customer_details.delivery === 0) {
                    vm.total = vm.subtotal + vm.serviceFee;
                } else if (vm.order.customer_details.delivery === 1) {
                    vm.total = vm.subtotal + vm.serviceFee + vm.deliveryFee;
                }
            };

            function saveOrder(data, url) {
                //send to server
                authService.payment(data, url, function (res) {
                    if (res.data.status === 'success') {
                        if ($localStorage.cart) {
                            delete $localStorage.cart;
                        }
                        $location.search({});
                        Notification.success('Order successful. Please check your email for confirmation.');
                        if ($localStorage.token) {
                            $location.path('/upcoming-orders/' + $scope.auth.data.id);
                        } else {
                            $state.go('chef-directory');
                        }
                        handler.close();
                    }
                    $rootScope.buttonDisabled = false;
                }, function (res) {
                    res = res.data;

                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                    } else {
                        Notification.error('There was an error processing your order. Please re-submit.');
                    }
                    $state.reload();
                    $rootScope.buttonDisabled = false;

                });
            }

            //gets chef data if there is no token
            function chefData () {
                authService.cart.chefData($localStorage.cart.carts_chef_id, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.carts = res.data;
                        vm.carts.details = $localStorage.cart.details;
                        vm.carts.carts_chef_id = $localStorage.cart.carts_chef_id;
                        if ($localStorage.cart.total > 0) {
                            vm.carts.total = $localStorage.cart.total;
                        }
                        setData();
                    }
                    else if (res.status === 'no cart') {
                        $state.go('chef-directory');
                        delete $localStorage.cart;
                        Notification.error('Your shopping cart is empty');
                    }
                });
            }

            //sets the data once we get the cart or the chef data
            function setData() {
                vm.deliveryFee = Number(vm.carts.chef.delivery_fee);
                vm.order.customer_details.delivery = vm.carts.chef.delivery;
                vm.carts.details.forEach(function (d) {
                    vm.subtotal += d.price * d.quantity;
                    vm.quantity += d.quantity;
                });
                vm.carts.user = {};
                if ($localStorage.token) {
                    vm.carts.user.name = $scope.auth.data.first_name + ' ' + $scope.auth.data.last_name;
                    vm.carts.user.email = $scope.auth.data.email;
                } else if (!$localStorage.token && vm.userFirst) {
                    vm.carts.user.name = vm.userFirst + ' ' + vm.userLast;
                    vm.carts.user.email = vm.userEmail;
                }
                if (vm.carts.total) {
                    vm.subtotal = Number(vm.carts.total);
                    //makes it so customer cant remove items if chef has a bundle deal.
                    vm.noRemove = true;
                }
                vm.total = vm.subtotal + vm.serviceFee + vm.deliveryFee;
                if (vm.quantity < vm.carts.chef.min_per_order) {
                    Notification.error('The chef requires a minimum of ' + vm.carts.order_min + ' meals per order. Your cart has been deleted.');
                    $state.go('chef-directory');
                }
            }

            //gets cart from database or localstorage
            function getCart() {
                if ($localStorage.cart) {
                    chefData();
                }
                else {
                    authService.cart.get(function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.carts = res.data;
                            setData();
                        } else if (res.status === 'no cart') {
                            $state.go('chef-directory');
                            Notification.error('Your shopping cart is empty');
                        }
                    });
                }
            }


            // open stripe checkout
            vm.open = function(userEmail) {
                var handler = StripeCheckout.configure({
                    key: 'pk_test_oWKufJufEgBLXc2ZlFcz0FTa',
                    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                    //TO-DO : replace the image and check the rest of the form.
                    locale: 'auto',
                    token: vm.onToken
                });

                handler.open({
                    panelLabel : 'Pay',
                    amount : vm.total * 100,
                    name : 'Orchid Eats',
                    description : 'Meal from locals, not restaurants.',
                    email : vm.carts.user.email,
                    zipCode : true,
                    billingAddress: true,
                    allowRememberMe : true
                });
            }
            //sends the http request with the token to create charge and save order to database
            vm.onToken = function(token) {
                token.chef_id = vm.carts.carts_chef_id;
                vm.order.meal_details = vm.carts.details;
                if (vm.order.customer_details.delivery === 1) {
                    vm.order.order_details = {
                        method: 'Delivery',
                        details: vm.carts.chef.delivery_info,
                        date: vm.carts.chef.delivery_date
                    };
                } else {
                    vm.order.order_details = {
                        method: 'Pickup',
                        details: vm.carts.chef.pickup_info,
                        date: vm.carts.chef.pickup_date,
                        address: vm.carts.chef.pickup_pickup
                    }
                }
                vm.order.customer_details = {
                    name: vm.carts.user.name,
                    email: vm.carts.user.email,
                    phone: vm.carts.user_profile.phone,
                    address: vm.carts.user_profile.address,
                    instructions: vm.order.customer_details.instructions
                };
                if ($localStorage.token) {
                    vm.order.orders_user_id = $scope.auth.data.id;
                } else {
                    vm.order.orders_user_id = null;
                }
                vm.order.order_total = vm.total;
                vm.order.payment_method = 'Card';
                //checks if chef offers bundle deal
                if (vm.carts.total) {
                    vm.order.bundle = true;
                }
                token.order = vm.order;
                //hides pages
                vm.process = true;
                saveOrder(token, '/payment');
            };

            //off platform payment
            vm.offPlatform = function () {
                vm.order.chef_id = vm.carts.carts_chef_id;
                vm.order.meal_details = vm.carts.details;
                if (vm.order.customer_details.delivery === 1) {
                    vm.order.order_details = {
                        method: 'Delivery',
                        details: vm.carts.chef.delivery_info,
                        date: vm.carts.chef.delivery_date
                    };
                } else {
                    vm.order.order_details = {
                        method: 'Pickup',
                        details: vm.carts.chef.pickup_info,
                        date: vm.carts.chef.pickup_date,
                        address: vm.carts.chef.pickup_pickup
                    }
                }
                vm.order.customer_details = {
                    name: vm.carts.user.name,
                    email: vm.carts.user.email,
                    phone: vm.carts.user_profile.phone,
                    address: vm.carts.user_profile.address,
                    instructions: vm.order.customer_details.instructions
                };
                if ($localStorage.token) {
                    vm.order.orders_user_id = vm.carts.carts_user_id;
                } else {
                    vm.order.orders_user_id = null;
                }
                vm.order.order_total = vm.total;
                //checks to see if chef offers bundle deal
                if (vm.carts.total) {
                    vm.order.bundle = true;
                }
                vm.order.payment_method = vm.carts.chef.payment_options;
                //hides pages
                vm.process = true;
                saveOrder(vm.order, '/offPlatform');
            };

            //removes items from cart
            vm.remove = function (index) {
                if (index > -1) {
                    vm.carts.details.splice(index, 1);
                }
                if (!vm.carts.details[0]) {
                    vm.carts.details[0] = 'empty';
                    $state.go('chef-directory');
                    Notification.error('Cart is empty');
                }
                if ($localStorage.token) {
                    authService.cart.update(vm.carts, function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            Notification.success('Item removed.');
                            $state.reload();
                        }
                    });
                }
            };

            run();
    })
})();