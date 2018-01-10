(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('PaymentController', function ($scope, $location, authService) {
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
                    amount : 4995,
                    name : 'My Product Name here',
                    description : '$49.95 Monthly Subscription',
                    email : userEmail,
                    zipCode : true,
                    allowRememberMe : true
                });
            };
    })
})();