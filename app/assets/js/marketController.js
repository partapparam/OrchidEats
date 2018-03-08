angular.module('OrchidApp')
    .controller('MarketController',
        function ($scope, $http, authService, Notification) {
            var vm = this;
            vm.listing = null;
            vm.diets = {
                'Keto': 1,
                'Paleo': 1,
                'Vegan': 1,
                'Vegetarian': 1,
                'Low-Carb': 1,
                'High-Protein': 1,
                'High-Fat': 1
            };
            vm.priceFilterValue = '';
            // vm.selected = [];
            // vm.includeForFilteringDiets = includeForFilteringDiets;
            // vm.filterDiet = filterDiet;
            // vm.filterableDiets = [];

            authService.marketplace(function (res) {
                res = res.data;
                if (res.status === 'success') {
                    vm.listing = res.data;
                } else {
                    Notification.error(res.message);
                }
            });

            // /**
            //  * Include diets that need to filter.
            //  *
            //  * @param dietName
            //  */
            // function includeForFilteringDiets(dietName) {
            //     dietName = dietName.toLowerCase().replace(/-/g, '_');
            //
            //     if (vm.filterableDiets.indexOf(dietName) > -1) {
            //         vm.filterableDiets.splice(vm.filterableDiets.indexOf(dietName), 1);
            //     } else {
            //         vm.filterableDiets.push(dietName);
            //     }
            // }
            //
            // /**
            //  * Diet filtering.
            //  *
            //  * @param listing
            //  * @returns {*}
            //  */
            // function filterDiet(listing) {
            //     var diets = vm.filterableDiets;
            //
            //     if (diets.length > 0) {
            //         return inArray(diets, listing);
            //     }
            //
            //     return listing;
            // }
            //
            // /**
            //  * Supporting method for diet filtering.
            //  *
            //  * @param needle
            //  * @param array
            //  * @returns {boolean}
            //  */
            // function inArray(needle, array) {
            //     var matched = [];
            //
            //     for (var i in needle) {
            //         if (array.diets[needle[i]] === 1) {
            //             matched.push(array);
            //         }
            //     }
            //
            //     return matched.length > 0;
            // }
        }
    );