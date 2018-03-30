(function () {
    'use strict';
    angular
        .module('OrchidApp')
        .controller('GalleryController', function ($stateParams, $rootScope, $state, authService, $scope, Notification) {
            var vm = this;
            vm.new = {};
            vm.open = false;
            vm.photos = null;
            vm.gallery = gallery;
            vm.profile = gallery;
            vm.params = $stateParams.id;

            $scope.sizeLimit = 10585760; // 10MB in Bytes
            $scope.uploadProgress = 0;
            vm.creds = {};

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            function gallery () {
                authService.gallery.get(vm.params, function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.creds =  res.data[1];
                        vm.photos = res.data[0];
                    }
                })
            }

            vm.remove = function (id) {
                authService.gallery.remove(id, function(res) {
                    res = res.data;
                    if (res.status === 'success') {
                        Notification.success('Item removed.');
                        $state.reload();
                    }
                });
            };

            $scope.upload = function() {
                AWS.config.update({ accessKeyId: vm.creds[0], secretAccessKey: vm.creds[1] });
                AWS.config.region = 'us-west-1';
                var bucket = new AWS.S3({ params: { Bucket:'meal.orchideats.com'} });

                if($scope.file) {
                    // Perform File Size Check First
                    var fileSize = Math.round(parseInt($scope.file.size));
                    if (fileSize > $scope.sizeLimit) {
                        Notification.error('Sorry, your attachment is too big. Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
                        return false;
                    }
                    // Prepend Unique String To Prevent Overwrites
                    var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

                    var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

                    bucket.putObject(params, function(err, data) {
                        if(err) {
                            console.log(err.message,err.code);
                            return false;
                        }
                        else {
                            // Upload Successfully Finished
                            vm.new.url = params.Key;
                            authService.gallery.post(vm.new, function (res) {
                                res = res.data;
                                $rootScope.buttonDisabled = false;
                                if (res.status === 'success') {
                                    vm.new = {};
                                    Notification('Success!');
                                    $state.reload();
                                } else if (res.status === 'error') {
                                    Notification.error('Error. Please try again');
                                }
                            }, function (res) {
                                res = res.data;
                                $rootScope.buttonDisabled = false;
                                if (res.status_code === 422) {
                                    /* I have added a reusable service to show form validation error from server side. */
                                    serverValidationErrorService.display(res.errors);
                                    Notification.error(res.message);
                                    $state.reload();
                                } else {
                                    Notification.error('There was an error processing your request. Please re-submit.');
                                    $state.reload();
                                }
                            });

                            // Reset The Progress Bar
                            setTimeout(function() {
                                $scope.uploadProgress = 0;
                                $scope.$digest();
                            }, 4000);
                        }
                    }).on('httpUploadProgress',function(progress) {
                        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                        $scope.$digest();
                    });
                }
                else {
                    // No File Selected
                    Notification.error('Please select a file to upload');
                    $rootScope.buttonDisabled = false;
                }
            };

            $scope.fileSizeLabel = function() {
                // Convert Bytes To MB
                return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
            };

            $scope.uniqueString = function() {
                var text     = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for( var i=0; i < 8; i++ ) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text + '-ID' + $scope.auth.data.id;
            };

            run();
        });

})();