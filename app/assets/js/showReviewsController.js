(function () {
    'use strict';

    angular.module('OrchidApp')
        .controller('ShowReviewsController', ['$http', '$scope',
            function ($http, $scope) {
                var vm = this;
                vm.reviews = [];
                $http({method: 'GET', url: window.api + '/showReviews.php', headers: "Access-Control-Allow-Origin: *"})
                    .then(function success(response) {
                        vm.reviews = response.data;
                        console.log(vm.reviews);
                    }).catch(function failure(response) {
                    console.log(response);
                    console.error(response);
                });
            }]);
})();