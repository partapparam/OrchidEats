angular.module('OrchidApp')

    .controller('MenuController', function ($scope, $state, authService, Notification, $stateParams, serverValidationErrorService) {
        var vm = this;
        vm.meals = null;
        vm.meal = null;
        var params = $stateParams.id;
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
        vm.editMenu = editMenu;


        function run() {
            if ($state.current.method !== undefined) {
                var method = $state.current.method;
                vm[method]()
            }
        }
        //current menu
        function currentMenu() {
            authService.menu.current(params, function (res) {
                res = res.data;
                console.log(res);
                if (res.status === 'success') {
                    vm.meals = res.data;
                } else {
                    Notification(res.message);
                }
            });
        }

        //gets current menu for profile page with ui-view for current menu
        function profile() {
            authService.menu.current(params, function (res) {
                res = res.data;
                console.log(res);
                if (res.status === 'success') {
                    vm.meals = res.data;
                } else {
                    Notification(res.message);
                }
            });
        }

        //past menu
        function pastMenu() {
            authService.menu.past(params, function (res) {
                res = res.data;
                // console.log(res);
                if (res.status === 'success') {
                    vm.meals = res.data;
                    console.log(vm.meals);
                } else {
                    Notification(res.message);
                }
            })
        }

        //get menu to edit info
        function editMenu() {
            //check to see if url param is a meal id number.
            if (params !== $scope.auth.data.first_name) {
                authService.menu.edit(params, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.meal = res.data;
                        console.log(vm.meal);
                    } else {
                        Notification.error('Meal data not found.')
                    }
                })
            }
        }

        var updated = [];

        vm.delete = function (meal) {
            authService.menu.delete(meal.meal_id, function (res) {
                console.log(res);
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
            console.log(updated);
            authService.menu.update(updated, function (res) {
                res = res.data;

                if (res.status === 'success') {
                    Notification.success('Menu updated successfully');
                    updated = [];
                    $state.reload();
                } else if (res.status === 'error') {
                    Notification.error('Error. Please try again');
                }
            }, function (res) {
                res = res.data;

                if (res.status_code === 422) {
                    /* I have added a reusable service to show form validation error from server side. */
                    serverValidationErrorService.display(res.errors);
                    Notification.error(res.message);
                }
            });
        };

        //create new meal
        vm.create = function (form) {
            if (form.validate()) {
                vm.meal.current_menu = 1;
                console.log(vm.meal);
                authService.menu.post(vm.meal, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.meal = null;
                        Notification.success('Meal saved to your current menu');
                        $state.reload();
                    } else if (res.status === 'error') {
                        Notification.error('Error. Please try again');
                    }
                }, function (res) {
                    res = res.data;

                    if (res.status_code === 422) {
                        /* I have added a reusable service to show form validation error from server side. */
                        serverValidationErrorService.display(res.errors);
                        Notification.error(res.message);
                    }
                });
            }
        };

        //Adding meal images
        //change this to cloud storage??
        // vm.uploader = new FileUploader({
        //     url: window.api + '/upload-image-temp.php', headers: "Access-Control-Allow-Origin: *"
        // });

        // FILTERS

        // a sync filter
        // vm.uploader.filters.push({
        //     name: 'imageFilter',
        //     fn: function(item /*{File|FileLikeObject}*/, options) {
        //         var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        //         return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        //     }
        // });

        // CALLBACKS

        // vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //     console.info('onWhenAddingFileFailed', item, filter, options);
        // };
        // vm.uploader.onAfterAddingFile = function(fileItem) {
        //     console.info('onAfterAddingFile', fileItem);
        // };
        // vm.uploader.onAfterAddingAll = function(addedFileItems) {
        //     console.info('onAfterAddingAll', addedFileItems);
        // };
        // vm.uploader.onBeforeUploadItem = function(item) {
        //     console.info('onBeforeUploadItem', item);
        // };
        // vm.uploader.onProgressItem = function(fileItem, progress) {
        //     console.info('onProgressItem', fileItem, progress);
        // };
        // vm.uploader.onProgressAll = function(progress) {
        //     console.info('onProgressAll', progress);
        // };
        // vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //     console.info('onSuccessItem', fileItem, response, status, headers);
        // };
        // vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
        //     console.info('onErrorItem', fileItem, response, status, headers);
        // };
        // vm.uploader.onCancelItem = function(fileItem, response, status, headers) {
        //     console.info('onCancelItem', fileItem, response, status, headers);
        // };
        // vm.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //     console.info('onCompleteItem', fileItem, response, status, headers);
        // };
        // vm.uploader.onCompleteAll = function() {
        //     console.info('onCompleteAll');
        // };
        //
        // console.info('uploader', vm.uploader);

        run();
    });