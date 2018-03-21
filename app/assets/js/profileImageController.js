'use strict';

angular
    .module('OrchidApp')
    .controller('ImageController', function ($state, $rootScope, authService, $scope, Notification, $location) {
            var vm = this;
            vm.user = {};
            vm.picture = null;
            vm.photo = photo;
            vm.redirect = $rootScope.redirectUri;

            $scope.sizeLimit = 10585760; // 10MB in Bytes
            $scope.uploadProgress = 0;
            vm.creds = {};

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            function photo() {
                authService.profilePhoto.get(function (res) {
                    res = res.data;
                    if (res.status === 'success') {
                        vm.creds =  res.data[0];
                        vm.picture =  res.data[1];
                    }
                })
            }

            $scope.upload = function() {
                AWS.config.update({ accessKeyId: vm.creds[0], secretAccessKey: vm.creds[1] });
                AWS.config.region = 'us-west-1';
                var bucket = new AWS.S3({ params: { Bucket:'profile.orchideats.com'} });

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
                            return false;
                        }
                        else {
                            // Upload Successfully Finished
                            vm.user.photo = params.Key;
                            authService.profilePhoto.post(vm.user, function (res) {
                                res = res.data;
                                if (res.status === 'success') {
                                    if (vm.redirect) {
                                        Notification({message: 'Nice! Ok, Last step. Time to setup your Stripe account.' +
                                            ' Click the big blue button.', delay: 10000});
                                        $location.path(vm.redirect);
                                        $rootScope.redirectUri = null;
                                    } else {
                                        $location.path('/profile/' + $scope.auth.data.id);
                                    }
                                } else {
                                    Notification.error('Error');
                                }
                            });

                            // Reset The Progress Bar
                            setTimeout(function() {
                                $scope.uploadProgress = 0;
                                $scope.$digest();
                            }, 4000);
                            $rootScope.buttonDisabled = false;
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

