(function () {
    'use strict';

    angular
        .module('OrchidApp')
        .controller('MealController', function ($stateParams, $state, authService, $scope, Notification) {
            var vm = this;
            vm.meal = {};
            vm.editMenu = editMenu;
            vm.params = $stateParams.id;

            // vm.url = 'https://s3-us-west-1.amazonaws.com/profile.orchideats.com/';

            $scope.sizeLimit = 10585760; // 10MB in Bytes
            $scope.uploadProgress = 0;
            vm.creds = {};

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            //prevents double click on submit buttons
            $scope.submit = function() {
                $scope.buttonDisabled = true;
            };

            //get menu to edit info
            function editMenu() {
                //check to see if url param is a meal id number.
                if (vm.params !== $scope.auth.data.first_name) {
                    authService.meal.get(vm.params, function (res) {
                        res = res.data;
                        if (res.status === 'success') {
                            vm.creds = res.data[1];
                            vm.meal = res.data[0];
                        } else {
                            Notification.error('Meal data not found.')
                        }
                    })
                } else {
                    photo();
                }
            }

            function photo() {
                authService.meal.creds(function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.creds =  res.data;
                    }
                })
            }

            //create new meal
            vm.create = function (form) {
                //if image is present, run $scope.upload.
                if ($scope.file) {
                    $scope.upload();
                } else {
                    if (form.validate()) {
                        vm.meal.current_menu = 1;
                        authService.meal.post(vm.meal, function (res) {
                            res = res.data;
                            if (res.status === 'success') {
                                vm.meal = {};
                                Notification.success('Meal saved to your current menu');
                                $scope.buttonDisabled = false;
                                $state.reload();
                            } else if (res.status === 'error') {
                                Notification.error('Error. Please try again');
                                $scope.buttonDisabled = false;
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
                    }
                }
            };

            $scope.upload = function() {
                AWS.config.update({ accessKeyId: vm.creds[0], secretAccessKey: vm.creds[1] });
                AWS.config.region = 'us-west-1';
                // AWS.config.endpoint = 'https://s3-us-west-1.amazonaws.com/';
                // // Configure the credentials provider to use your identity pool
                // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                //     IdentityPoolId: 'us-east-1:3a2d2788-f69e-4cd6-a076-62c41ba18c23'
                // });

// Make the call to obtain credentials
//                 AWS.config.credentials.get(function(){
//
//                     // Credentials will be available when this function is called.
//                     var accessKeyId = AWS.config.credentials.accessKeyId;
//                     var secretAccessKey = AWS.config.credentials.secretAccessKey;
//                     var sessionToken = AWS.config.credentials.sessionToken;
//
//                 });
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
                            vm.meal.photo = params.Key;
                            vm.meal.current_menu = 1;
                            authService.meal.post(vm.meal, function (res) {
                                res = res.data;
                                if (res.status === 'success') {
                                    vm.meal = {};
                                    Notification.success('Meal saved to your current menu');
                                    $scope.buttonDisabled = false;
                                    $state.reload();
                                } else if (res.status === 'error') {
                                    Notification.error('Error. Please try again');
                                    $scope.buttonDisabled = false;
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