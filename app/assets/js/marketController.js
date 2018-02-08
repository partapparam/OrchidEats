angular.module('OrchidApp')
    .controller('MarketController',
        function ($scope, $http, authService, Notification) {
            var vm = this;
            vm.listing = null;
            vm.diets = {
                0: 'Keto',
                1: 'Paleo',
                2: 'Vegan',
                3: 'Vegetarian',
                4: 'Low-Carb',
                5: 'High-Protein',
                6: 'High-Fat'
            };
            vm.selected = [];

            authService.marketplace(function (res) {
                res = res.data;
                // console.log(res);
                if (res.status === 'success') {
                    vm.listing = res.data;
                    console.log(vm.listing);
                } else {
                    Notification.error(res.message);
                }
            });

            //checks if dropdown is open or closed.
            vm.toggled = function(open) {
                if (open) {
                    console.log('is open');
                } else if (!open && vm.selected[0]) {
                    console.log('close');
                }
            };
            //creates the diet filter array that is passed to ng-repeat
            vm.filter = function (diet){
                if (vm.selected.indexOf(diet) > -1) {
                    vm.selected = vm.selected.filter(function(item) {
                        return item !== diet
                    });
                } else {
                    vm.selected.push(diet);
                }
                console.log(vm.selected);
            };

    });