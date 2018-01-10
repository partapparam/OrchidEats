angular.module('OrchidApp')

    .controller('UpdateMenuController', ['FileUploader', function ($scope, $route, authService, FileUploader) {
        var vm = this;
        vm.meal = {};

        function run() {
            if ($route.current.method !== undefined) {
                var method = $route.current.method;
                $scope[method]()
            }
        }

        $scope.menu = function () {
            authService.menu.get(function (res) {
                if (res.status === 'success') {
                    vm.meal = res.data;
                } else {
                    alert(res.message);
                }
            })
        };

        vm.update = function () {
            console.log(vm.meal);
            authService.menu.post(vm.meal);
        };
        //Adding meal images
        //change this to cloud storage??
        vm.uploader = new FileUploader({
            url: window.api + '/upload-image-temp.php', headers: "Access-Control-Allow-Origin: *"
        });

        // FILTERS

        // a sync filter
        vm.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        vm.uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        vm.uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        vm.uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        vm.uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        vm.uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        vm.uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        vm.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        vm.uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', vm.uploader);

        run();
    }]);