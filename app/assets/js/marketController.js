angular.module('OrchidApp')
    .controller('MarketController',
        function ($scope, $http, authService, Notification) {
            var vm = this;
            vm.listing = [];
            vm.diets = {
                'Keto': 1,
                'Paleo': 1,
                'Vegan': 1,
                'Vegetarian': 1,
                'Low-Carb': 1,
                'High-Protein': 1,
                'High-Fat': 1,
                'Paleo': 1
            };
            vm.priceFilterValue = '';
            vm.selected = [];
            vm.includeForFilteringDiets = includeForFilteringDiets;
            vm.filterDiet = filterDiet;
            vm.filterableDiets = [];

            authService.marketplace(function (res) {
                res = res.data;
                // console.log(res);
                if (res.status === 'success') {
                    vm.listing = res.data;
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

            function includeForFilteringDiets(dietName) {
                dietName = dietName.toLowerCase().replace(/-/g, '_');

                if (vm.filterableDiets.indexOf(dietName) > -1) {
                    vm.filterableDiets.splice(vm.filterableDiets.indexOf(dietName), 1);
                } else {
                    vm.filterableDiets.push(dietName);
                }
            }

            function filterDiet(listing) {
                if (vm.filterableDiets.length > 0) {
                    var keys = Object.keys(listing.diets);

                    if (! $.inArray()) return;
                }

                return listing;
            }
        }
    );