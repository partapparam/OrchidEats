(function () {
   'use strict';

   angular.module('OrchidApp')
       .controller('ReviewsController',
       function ($scope, $state, authService) {
           var vm = this;
           vm.review = {};

           //below is for star rating settings
           vm.max = 5;
           vm.isReadonly = false;
           vm.hoveringOver = function(value) {
               vm.overStar = value;
           };

           function run() {
               if ($state.current.method !== undefined) {
                   var method = $state.current.method;
                   $scope[method]()
               }
           }

           $scope.reviews = function () {
               authService.reviews.get(function (res) {
                   res = res.data;
                   console.log(res);
                   // if (res.status === 'success') {
                   //     vm.review = res.data;
                   // } else {
                   //     Notification.error(res.message);
                   // }
               })
           };

           $scope.update = function () {
               console.log(vm.review);
               authService.reviews.post(vm.review);
           };

           run();
       })
})();