(function () {
    'use strict';
    angular.module('OrchidApp')
        .controller('InboxController', function ($scope, $state, $stateParams, authService, $localStorage, Notification) {
            var vm = this;
            var socket;
            vm.convos = null;
            vm.chat = {};
            vm.messages = [];
            vm.params = $localStorage.messageTo;
            vm.inbox = inbox;
            vm.selected = false;

            function run() {
                if ($state.current.method !== undefined) {
                    var method = $state.current.method;
                    vm[method]();
                }
            }

            socket = io.connect('http://localhost:3000');
            console.log('connected');

            function inbox () {
                socket.emit('getInbox', $scope.auth.data.id);
            }

            //gets all message from socket once a convo is selected
            function messages (room) {
                socket.emit('messages', room);
            }

            //creates a new convo/room when user clicks on 'send message' button
            if (vm.params) {
                vm.chat.room_id = uniqueString();
                vm.chat.to_user_id = vm.params;
                socket.emit('create', vm.chat.room_id);
                delete $localStorage.messageTo;
                vm.selected = true;
            }

            socket.on('showInbox', function (res) {
                res = JSON.parse(res);
                if (res.status === "success") {
                    $scope.$apply(function() {
                        vm.convos = res.data;
                    });
                }
            });

            socket.on('show', function (res) {
                // vm.messages = JSON.parse(res);
                $scope.$apply(function() {
                    vm.messages = JSON.parse(res);
                });
            });

            socket.on('update', function (res) {
                $scope.$apply(function() {
                    vm.messages.push(res);
                });
            });

            vm.leave = function (chat) {
                socket.emit('leave', chat.room_id);
                $state.reload();
                vm.chat = {};
                vm.selected = !vm.selected;
            };

            // vm.remove = function (convo) {
            //     socket.emit('delete', convo.room_id);
            //     var index = vm.convos.indexOf(convo);
            //     vm.convos.splice(index, 1);
            // };

            //join existing room
            vm.selectChat = function (convo) {
                if (vm.messages[0]) {
                    socket.emit('leave', convo.room_id);
                    vm.messages = [];
                    vm.chat = {};
                }
                vm.chat.room_id = convo.room_id;
                vm.chat.to_user_id = convo.to_user_id;
                messages(convo.room_id);
                socket.emit('join', convo.room_id);
            };

            vm.send = function (e, data) {
                e.preventDefault();
                data.room_id = vm.chat.room_id;
                data.from_user_id = $scope.auth.data.id;
                data.to_user_id = vm.chat.to_user_id;
                data.created_at = Math.floor(Date.now() / 1000);
                socket.emit('newMessage', data);
                vm.chat.message = null;
            };

             //creates unique room id
             function uniqueString () {
                return 'ID' + $scope.auth.data.id + '&' + vm.params;
            }

            run();
        })
})();