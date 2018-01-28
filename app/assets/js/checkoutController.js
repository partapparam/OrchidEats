(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('CheckoutController', function ($state, $scope, $location, authService, $sessionStorage, Notification) {
            var vm = this;
            vm.carts = {};
            vm.total = 0;
            vm.subtotal = 0;
            vm.deliveryFee = 4.99;

            $scope.onToken = function(token) {
                console.log(token);
                authService.payment(token).then(function success() {
                    handler.close();
                    $location.path('/orders');
                }).catch(function error(data) {
                    console.log(data);
                });
                // now call a service to push the necessary token info to the server to complete the checkout processing
            };

            $scope.open = function( userEmail) {
                var handler = StripeCheckout.configure({
                    key: 'pk_test_oWKufJufEgBLXc2ZlFcz0FTa',
                    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                    //TO-DO : replace the image and check the rest of the form.
                    locale: 'auto',
                    token: $scope.onToken
                });

                handler.open({
                    panelLabel : 'Pay',
                    amount : vm.total * 100,
                    name : 'Orchid Eats',
                    description : 'Meals from locals, not restaurants.',
                    email : $scope.auth.data.email,
                    zipCode : true,
                    allowRememberMe : true
                });
            };

            function run() {
            	if ($state.current.method !== undefined) {
            		var method = $state.current.method;
            		$scope[method]();
            	}
            }

            $scope.getCart = function () {
                if ($sessionStorage.cart) {
                    vm.carts = $sessionStorage.cart;
                    vm.carts.forEach(function (d) {
                        vm.subtotal += d.price * d.qty;
                    });
                    vm.total = vm.subtotal + vm.deliveryFee;
                    console.log(vm.total);
                    }
                else {
                    $state.go('marketplace');
                    Notification.error('Your shopping cart is empty');
                }
            };

            run();
            //need to figure out how to submit the order to the database. What relaitonship do I need to build between the orders, meals, and order details page.
            $scope.remove = function (index) {
                if (index > -1) {
                    vm.carts.splice(index, 1);
                    $state.reload();
                }
                if (!$sessionStorage.cart[0]) {
                    $state.go('marketplace');
                    Notification.error('Cart is empty');
                }
            }
    })
})();