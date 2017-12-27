(function() {
    'use strict';

    angular
        .module('OrchidApp')
        .controller('AdminController', [
            '$http',
            adminController
        ]);

    function adminController($http) {
        var vm = this;

        vm.message = '';

        $http({ method: 'GET', url: '/api/admin' })
            .then(function(response) {
                if(response && response.data) {
                    vm.message = response.data.message;
                }
            });
    }
})();