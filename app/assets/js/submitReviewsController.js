(function () {
   'use strict';

   angular.module('OrchidApp')
       .controller('SubmitReviewsController', ['$http', '$scope', '$rootScope',
       function ($http, $scope, $rootScope) {
           var vm = this;
           vm.review = {};
           $scope.date = function () {
               var date = new Date();
               vm.review.date = date;
           };
           vm.review.user_id = 1;
           vm.review.chef_id = 2;
           vm.review.date = undefined;
           console.log(vm.review);
           $scope.save = function () {
               $http({method: 'POST', url: window.api + '/submitReviews.php', data: vm.review, headers: {'Content-Type' : 'application/json'}
               }).then(function success(data) {
                   console.log(data);
               }).catch(function () {
                   console.log("error");
               });
           };

           vm.max = 5;
           vm.isReadonly = false;

           vm.hoveringOver = function(value) {
               vm.overStar = value;
           };
       }
       ])
})();