(function () {
    'use strict';

    angular
        .module('OrchidApp')
        .controller('MealController', function ($stateParams, $rootScope, $state, authService, $scope, Notification) {
            var vm = this;
            vm.meal = {};
            vm.editMeal = editMeal;
            vm.vip = false;
            vm.params = $stateParams.id;

            vm.validation = {
                rules: {
                    name: {
                        required: true
                    },
                    type: {
                        required: true
                    },
                    price: {
                        required: true
                    },
                    description: {
                        maxlength: 300
                    },
                    calories: {
                        maxlenght: 4
                    },
                    fat: {
                        maxlenght: 4
                    },
                    protein: {
                        maxlenght: 4
                    },
                    carbs: {
                        maxlenght: 4
                    }
                },
                messages: {
                    name: 'Name is required',
                    type: 'Meal type is required',
                    price: 'Price is required',
                    description: 'Description must be under 300 characters'
                }
            };

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            //get menu to edit info
            function editMeal() {
                //check to see if url param is a meal id number.
                if (vm.params !== $scope.auth.data.first_name) {
                    authService.meal.get(vm.params, function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.meal = res.data;
                        } else {
                            Notification.error('Meal data not found.')
                        }
                    })
                }
            }

            //create new meal
            vm.create = function (form) {
                if (form.validate()) {
                    vm.meal.current_menu = 1;
                    authService.meal.post(vm.meal, function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.meal = {};
                            Notification.success('Meal saved to your current menu');
                            $state.reload();
                        } else if (res.status === 'error') {
                            Notification.error('Error. Please try again');
                        }
                        $rootScope.buttonDisabled = false;
                    }, function (res) {
                        res = res.data;

                        if (res.status_code === 422) {
                            /* I have added a reusable service to show form validation error from server side. */
                            serverValidationErrorService.display(res.errors);
                            Notification.error(res.message);
                            $state.reload();
                        }
                        $rootScope.buttonDisabled = false;
                    });
                }
            };

            run();
        });

})();