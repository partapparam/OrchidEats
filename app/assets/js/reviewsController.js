(function () {
   'use strict';

   angular.module('OrchidApp')
       .controller('ReviewsController',
       function ($scope, $state, authService, Notification, $stateParams, $location, serverValidationErrorService) {
           var vm = this;
           vm.review = null;
           var params = $stateParams.id;
           vm.validation = {
               rules: {
                   rating: {
                       required: true,
                       digits: true
                   },
                   chef_feedback: {
                       maxlength: 500
                   },
                   body: {
                       maxlength: 500
                   }
               },
               messages: {
                   rating: 'Rating is required',
                   chef_feeback: 'Chef feedback must be less than 500 characters',
                   body: 'Review must be less than 500 charactes'
               }
           };

           //prevents double click on submit buttons
           $scope.submit = function() {
               $scope.buttonDisabled = true;
               console.log("button clicked");
           };

           //below is for star rating settings
           vm.max = 5;
           vm.isReadonly = false;
           vm.hoveringOver = function(value) {
               vm.overStar = value;
           };

           vm.reviews = reviews;
           //gets reviews on profile page
           vm.profile = reviews;
           //gets reviews on marketplace page
           vm.marketplace = reviews;

           function run() {
               if ($state.current.method !== undefined) {
                   var method = $state.current.method;
                   vm[method]()
               }
           }

           function reviews() {
               authService.reviews.get(params, function (res) {
                   res = res.data;
                   console.log(res);
                   if (res.status === 'success') {
                       vm.review = res.data;
                   } else {
                       Notification.error(res.message);
                   }
               });
           }

           vm.save = function (form) {
               if (form.validate()) {
                   vm.review.order_id = params;
                   console.log(vm.review);
                   authService.reviews.post(vm.review, function (res) {
                       res = res.data;
                       if (res.status === 'success') {
                           Notification.success('Review submitted');
                           $scope.buttonDisabled = false;
                           $location.path('/past-orders/' + $scope.auth.data.id);
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
           };

           run();
       })
})();