angular.module('OrchidApp')

    .controller('MenuController', function ($scope, $state, authService, FileUploader, Notification) {
        var vm = this;
        vm.meals = {};
        vm.meal = {};

        function run() {
            if ($state.current.method !== undefined) {
                var method = $state.current.method;
                $scope[method]()
            }
        }
        //current menu
        $scope.currentMenu = function () {
            authService.menu.current(function (res) {
                res = res.data;
                // console.log(res);
                if (res.status === 'success') {
                    vm.meals = res.data;
                } else {
                    Notification(res.message);
                }
            })
        };

        //past menu
        $scope.pastMenu = function () {
            authService.menu.past(function (res) {
                res = res.data;
                // console.log(res);
                if (res.status === 'success') {
                    vm.meals = res.data;
                    console.log(vm.meals);
                } else {
                    Notification(res.message);
                }
            })
        };

        var updated = [];

        vm.delete = function (meal) {
            authService.menu.delete(meal.meal_id, function (res) {
                Notification.success(res.data.status);
                $state.reload();
            })
        };

        vm.change = function (meal) {
            updated.push({
                'meal_id': meal.meal_id,
                'current_menu': meal.current_menu,
            });
        };

        vm.addToMenu = function () {
            console.log(updated);
            authService.menu.update(updated, function (res) {
                res = res.data;

                if (res.status === 'success') {
                    Notification.success('Menu updated successfully');
                    updated = [];
                    $state.reload();
                }
            })
        };


        vm.update = function () {
            console.log(vm.meal);
            authService.menu.post(vm.meal, function (res) {
                res = res.data;
                if (res.status === 'success') {
                    vm.meal = {};
                    Notification.success('Meal saved to your current menu');
                    $state.reload();
                } else {
                    Notification.error('Error. Please try again');
                }
            });
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