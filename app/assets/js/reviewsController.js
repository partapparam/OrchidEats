(function () {
   'use strict';

   angular.module('OrchidApp')
       .controller('ReviewsController',
       function ($scope, $state, authService, $rootScope, Notification, $stateParams, $location, serverValidationErrorService, $localStorage) {
           var vm = this;
           vm.review = null;
           var params = $stateParams.id;
           vm.userName = $location.search().name;
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
                   chef_feedback: 'Chef feedback must be less than 500 characters',
                   body: 'Review must be less than 500 characters'
               }
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
                   if (res.status === 'success') {
                       vm.review = res.data;
                       //Changes timestamp to clean date format
                       vm.review.forEach(function (e) {
                           e.created_at = Date.parse(e.created_at)
                       });
                   } else {
                       Notification.error(res.message);
                   }
               });
           }

           vm.save = function (form) {
               if (form.validate()) {
                   vm.review.order_id = params;
                   if (vm.userName) {
                       vm.review.left_by = vm.userName;
                   }
                   authService.reviews.post(vm.review, function (res) {
                       res = res.data;
                       if (res.status === 'success') {
                           $location.search({});
                           Notification.success('Review submitted');
                           if ($localStorage.token) {
                               $location.path('/past-orders/' + $scope.auth.data.id);
                           } else {
                               $state.go('chef-directory');
                           }
                       }
                       $rootScope.buttonDisabled = false;
                   }, function (res) {
                       res = res.data;

                       if (res.status_code === 422) {
                           /* I have added a reusable service to show form validation error from server side. */
                           serverValidationErrorService.display(res.errors);
                           Notification.error(res.message);
                           $state.reload();
                       } else {
                           Notification.error('There was an error processing your request. Please re-submit.');
                           $state.reload();
                       }
                       $rootScope.buttonDisabled = false;

                   });
               }
           };

           run();
       })
})();