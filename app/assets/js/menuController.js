angular.module('OrchidApp')

    .controller('MenuController', function ($scope, $rootScope, $state, authService, Notification, $stateParams, serverValidationErrorService) {
        var vm = this;
        vm.meals = null;
        vm.meal = null;
        vm.params = $stateParams.id;
        vm.chefMeals = chefMeals;
        vm.currentMenu = currentMenu;

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

        //past menu
        function chefMeals() {
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
                } else {
                    Notification.error('There was an error processing your request. Please re-submit.');
                    $state.reload();
                }
                $rootScope.buttonDisabled = false;

            });
        };

        run();
    });