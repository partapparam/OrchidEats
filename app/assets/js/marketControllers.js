angular.module('OrchidApp')

    .controller('marketController', ['$scope', '$http', function ($scope, $http) {
        console.log('ANYTHING');
        $scope.users=[];
        $http({method: 'GET', url: window.api + '/market.php', headers: "Access-Control-Allow-Origin: *" })
            .then(function successCallback(response) {
                $scope.users = response.data;
                console.log($scope.users);
                console.log("There is data here.");
                return $scope.users;
            }, function errorCallback(response) {
                console.log(response.data);
                console.log("Error.");
            });
    }]);