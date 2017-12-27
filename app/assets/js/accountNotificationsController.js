(function () {
    'use strict';

    angular.module('OrchidApp').controller('AccountNotificationController', ['$scope', '$http',


        function ($scope, $http) {
        var vm = this;
        vm.user = {};
        $http({method: 'GET', url: window.api + '/users.php', headers: "Access-Control-Allow-Origin: *"})
            .then(function success(response) {
                vm.user = response.data[0];
                return vm.user;
            }).catch(function failed(response) {
                console.log(response.data);
                console.error(error);
            });


        $scope.update = function () {
          console.log(vm.user);
          $http({method: 'POST', url: window.api + '/accountNotifications.php', data:
                  {'email_notif':vm.user.email_notif,
                    'text_notif':vm.user.text_notif}  ,
                      headers: {'Content-Type': 'application/json'}
          }).then(function (data) {
              console.log(data);
          });

        };
    }])
})();