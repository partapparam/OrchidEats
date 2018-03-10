(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('CheckoutController', function ($state, $scope, $location, authService, $localStorage, Notification, $stateParams) {
            var vm = this;
            vm.carts = null;
            vm.order = {};
            vm.total = 0;
            vm.quantity = 0;
            vm.subtotal = 0;
            vm.deliveryFee = 4.99;
            vm.serviceFee = 0.99;
            vm.source = false;
            vm.params = $stateParams.id;
            vm.getCart = getCart;
            vm.order.customer_details = {};
            vm.order.customer_details.delivery = null;
            vm.order.customer_details.instructions = null;

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            function getCart() {
                authService.cart.get(function(res) {
                    res = res.data;
                    console.log(res);
                    if (res.status === 'success') {
                        vm.carts = res.data;
                        vm.order.customer_details.delivery = vm.carts.chef.oe_delivery;

                        vm.carts.details.forEach(function (d) {
                            vm.subtotal += d.price * d.quantity;
                            vm.quantity += d.quantity;
                        });
                        vm.total = vm.subtotal + vm.serviceFee + vm.deliveryFee;
                        if (vm.quantity < vm.carts.chef.min_per_order) {
                            Notification.error('The chef requires a minimum of ' + vm.carts.order_min + ' meals per order. Your cart has been deleted.');
                            $state.go('marketplace');
                        }
                    }
                    else if (res.status === 'no cart') {
                        $state.go('marketplace');
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
                        method: 'delivery',
                        details: vm.carts.chef.delivery_info,
                        date: vm.carts.chef.delivery_date
                    };
                } else {
                    vm.order.order_details = {
                        method: 'pickup',
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
                authService.payment(token, function (res) {
                    if (res.data.status === 'success') {
                        Notification.success('Order successful. Please check your email for confirmation.');
                        $scope.buttonDisabled = true;
                        $location.path('/upcoming-orders/' + $scope.auth.data.id);
                        handler.close();
                    }
                }, function (res) {
                    res = res.data;

                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                        $scope.buttonDisabled = false;
                        $state.reload();
                    }
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
                    email : $scope.auth.data.email,
                    zipCode : true,
                    billingAddress: true,
                    allowRememberMe : true
                });
            };

            //removes items from cart
            vm.remove = function (index) {
                if (index > -1) {
                    vm.carts.details.splice(index, 1);
                }
                if (!vm.carts.details[0]) {
                    vm.carts.details[0] = 'empty';
                    $state.go('marketplace');
                    Notification.error('Cart is empty');
                }
                authService.cart.update(vm.carts, function(res) {
                    res = res.data;
                    if (res.status === 'success') {
                        Notification.success('Item removed.');
                        $state.reload();
                    }
                });
            }

            run();
    })
})();