'use strict';

angular
    .module('OrchidApp')
    .controller('ImageController', function ($state, authService, $scope, Notification) {
            var vm = this;
            vm.user = {};
            vm.photo = photo;

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
                        vm.creds =  res.data;
                    }
                })
            }

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
                                    Notification.success('File Uploaded Successfully', 'Done');
                                } else {
                                    Notification.error('Error');
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

