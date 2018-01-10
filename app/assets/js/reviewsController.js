(function () {
   'use strict';

   angular.module('OrchidApp')
       .controller('SubmitReviewsController',
       function ($scope, $route, authService) {
           var vm = this;
           vm.review = {};

           //below is for star rating settings
           vm.max = 5;
           vm.isReadonly = false;
           vm.hoveringOver = function(value) {
               vm.overStar = value;
           };

           function run() {
               if ($route.current.method !== undefined) {
                   var method = $route.current.method;
                   $scope[method]()
               }
           }

           $scope.reviews = function () {
               authService.reviews.get(function (res) {
                   if (res.status === 'success') {
                       vm.user = res.data;
                   } else {
                       alert(res.message);
                   }
               })
           };

           $scope.update = function () {
               console.log(vm.review);
               authService.reviews.post(vm.review);
           };

           run();
       })
})();