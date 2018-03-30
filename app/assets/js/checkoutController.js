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
            vm.serviceFee = 1.49;
            vm.source = false;
            vm.params = $stateParams.id;
            vm.getCart = getCart;
            vm.order.customer_details = {};
            vm.order.customer_details.delivery = null;
            vm.order.customer_details.instructions = null;
            //hides the page after the user clicks on the order button.
            vm.process = false;

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            //changes price depending on if user selects delivery or not.
            $scope.price = function () {
                if (vm.order.customer_details.delivery === 0) {
                    vm.total = vm.subtotal + vm.serviceFee;
                } else if (vm.order.customer_details.delivery === 1) {
                    vm.total = vm.subtotal + vm.serviceFee + vm.deliveryFee;
                }

            };

            function getCart() {
                authService.cart.get(function(res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.carts = res.data;
                        vm.deliveryFee = Number(vm.carts.chef.delivery_fee);
                        vm.order.customer_details.delivery = vm.carts.chef.delivery;

                        vm.carts.details.forEach(function (d) {
                            vm.subtotal += d.price * d.quantity;
                            vm.quantity += d.quantity;
                        });
                        vm.total = vm.subtotal + vm.serviceFee + vm.deliveryFee;
                        if (vm.quantity < vm.carts.chef.min_per_order) {
                            Notification.error('The chef requires a minimum of ' + vm.carts.order_min + ' meals per order. Your cart has been deleted.');
                            $state.go('chef-directory');
                        }
                    }
                    else if (res.status === 'no cart') {
                        $state.go('chef-directory');
                        Notification.error('Your shopping cart is empty');
                    }
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
                    email: vm.carts.user.email,
                    phone: vm.carts.user_profile.phone,
                    address: vm.carts.user_profile.address,
                    instructions: vm.order.customer_details.instructions
                };
                vm.order.orders_user_id = vm.carts.carts_user_id;
                vm.order.order_total = vm.total;
                token.order = vm.order;
                //hides pages
                vm.process = true;

                //send to server
                authService.payment(token, function (res) {
                    if (res.data.status === 'success') {
                        Notification.success('Order successful. Please check your email for confirmation.');
                        $location.path('/upcoming-orders/' + $scope.auth.data.id);
                        handler.close();
                    }
                    $rootScope.buttonDisabled = false;
                }, function (res) {
                    res = res.data;

                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                        $state.reload();
                    } else {
                        Notification.error('There was an error processing your order. Please re-submit.');
                        $state.reload();
                    }
                    $rootScope.buttonDisabled = false;

                });
            };

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
                authService.cart.update(vm.carts, function(res) {
                    res = res.data;
                    if (res.status === 'success') {
                        Notification.success('Item removed.');
                        $state.reload();
                    }
                });
            };

            run();
    })
})();