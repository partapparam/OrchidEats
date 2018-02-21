angular.module('OrchidApp')

    .controller('MenuController', function ($scope, $state, authService, Notification, $stateParams, serverValidationErrorService) {
        var vm = this;
        vm.meals = null;
        vm.meal = null;
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
        vm.pastMenu = pastMenu;
        vm.profile = profile;
        vm.currentMenu = currentMenu;

        //prevents double click on submit buttons
        $scope.submit = function() {
            $scope.buttonDisabled = true;
        };


        function run() {
            if ($state.current.method !== undefined) {
                var method = $state.current.method;
                vm[method]()
            }
        }
        //current menu
        function currentMenu() {
            authService.menu.current(vm.params, function (res) {
                res = res.data;
                if (res.status === 'success') {
                    vm.meals = res.data;
                } else {
                    Notification(res.message);
                }
            });
        }

        //gets current menu for profile page with ui-view for current menu
        function profile() {
            authService.menu.current(vm.params, function (res) {
                res = res.data;
                if (res.status === 'success') {
                    vm.meals = res.data;
                } else {
                    Notification(res.message);
                }
            });
        }

        //past menu
        function pastMenu() {
            authService.menu.past(vm.params, function (res) {
                res = res.data;
                if (res.status === 'success') {
                    vm.meals = res.data;
                } else {
                    Notification(res.message);
                }
            })
        }

        var updated = [];

        vm.delete = function (meal) {
            authService.menu.delete(meal.meal_id, function (res) {
                Notification.success(res.data.message);
                $state.reload();
            })
        };

        vm.change = function (meal) {
            updated.push({
                'meal_id': meal.meal_id,
                'current_menu': meal.current_menu
            });
        };

        //add meal to current menu
        vm.addToMenu = function () {
            authService.menu.update(updated, function (res) {
                res = res.data;

                if (res.status === 'success') {
                    Notification.success('Menu updated successfully');
                    updated = [];
                    $scope.buttonDisabled = false;
                    $state.reload();
                } else if (res.status === 'error') {
                    $scope.buttonDisabled = false;
                    Notification.error('Error. Please try again');
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

        run();
    });