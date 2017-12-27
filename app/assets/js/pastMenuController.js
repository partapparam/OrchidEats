(function () {
    'use strict';

    angular.module('OrchidApp')
        .controller('PastMenuController', ['$http', '$scope',
        function ($http) {
            var vm = this;
            vm.meals = {};
            $http({method: 'GET', url: window.api + '/getMeals.php', headers: "Access-Control-Allow-Origin: *"})
                .then(function success (response) {
                    console.log(response.data);
                    vm.meals = response.data;
                }).catch(function fail(response) {
                console.log(response.data);
            });
        }])
})();