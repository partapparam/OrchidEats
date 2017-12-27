"use strict";

const OrchidApp = angular.module('OrchidApp', [
	'ui.router',
	'ngStorage', 'ngCookies', 'ui.bootstrap', 'ngMessages', 'angularFileUpload'
]);

//Make sure to include ui-router case-sensitive code into the config file and change default settings for having
// forward slash at the end of the url

OrchidApp.config(function ($stateProvider, $locationProvider, $httpProvider, $qProvider, $urlRouterProvider) {
	$qProvider.errorOnUnhandledRejections(false);
	$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    // Landing route.
    $stateProvider.state('landing', {
        url: '/',
        templateUrl: '../../views/landing-page.html'
    });

    // admin route.
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '../../views/admin.html'
    });

    // Login route.
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '../../views/login.html',
        resolve: {
            guest: guest
        }
    });

    // User area route.
    $stateProvider.state('profile', {
        url: '/profile',
        views: {
            '': {templateUrl: '../../views/profile-page.html'},
            //child view
            'reviewSection@profile': {
                templateUrl: '../../views/show-reviews.html'
            },
            controller: 'ProfileController'
        },
        method: 'profile',
        //what is meant by this
        //
        //
        //
        //
        resolve: {
            guest: auth
        }
    });

    // Signup route.
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: '../../views/signup.html',
        resolve: {
            guest: guest
        }
    });

    // Marketplace route.
    $stateProvider.state('marketplace', {
        url: '/marketplace',
        templateUrl: '../../views/marketplace.html',
        controller: 'MarketController'
    });

    // Orders route.
    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: '../../views/user-orders.html',
        controller: 'OrdersController',
        resolve: {
            guest: auth
        }
    });

    // About route.
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: '../../views/about.html'
    });

    // Contact route.
    $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: '../../views/partial-contact.html'
    });

    // Privacy route.
    $stateProvider.state('privacy', {
        url: '/privacy-policy',
        templateUrl: '../../views/privacy-policy.html'
    });

    // FAQs route.
    $stateProvider.state('faqs', {
        url: '/faqs',
        templateUrl: '../../views/faqs-page.html',
        controller: 'FaqController'
    });

    // Apply to Cook route.
    $stateProvider.state('cooking-info', {
        url: '/apply-to-cook',
        templateUrl: '../../views/cooking-info.html'
    });

    // Terms of Use route.
    $stateProvider.state('terms', {
        url: '/terms-of-use',
        templateUrl: '../../views/terms-of-use.html'
    });

    // Safety route.
    $stateProvider.state('safety', {
        url: '/safety',
        templateUrl: '../../views/safety.html'
    });

    // How It Works route.
    $stateProvider.state('learn-more', {
        url: '/learn-more',
        templateUrl: '../../views/learn-more.html'
    });

    // edit profile route.
    $stateProvider.state('edit-profile', {
        url: '/edit-profile',
        views: {
            '': {templateUrl: '../../views/edit-profile.html'},
            //child view
            'miniNav@edit-profile': {
                templateUrl: '../../views/profile-nav-bar.html'
            },
            controller: 'EditProfileController'
        }
    });

    // Account-notifications route.
    $stateProvider.state('account-notifications', {
        url: '/account-notifications-settings',
        views: {
            '': {templateUrl: '../../views/account-notifications.html'},
            //child view
            'miniNav@account-notifications': {
                templateUrl: '../../views/profile-nav-bar.html'
            },
            controller: 'AccountNotificationController'
        }
    });

    // account-payment route.
    $stateProvider.state('account-payment', {
        url: '/account-payment-settings',
        views: {
            '': {templateUrl: '../../views/account-payment.html'},
            //child view
            'miniNav@account-payment': {
                templateUrl: '../../views/profile-nav-bar.html'
            }
        }
    });

    // account-password-settings route.
    $stateProvider.state('account-password', {
        url: '/account-password-settings',
        views: {
            '': {templateUrl: '../../views/account-password.html'},
            //child view
            'miniNav@account-password': {
                templateUrl: '../../views/profile-nav-bar.html'
            }
        }
    });

    // chef current menu route.
    $stateProvider.state('chef-current-menu', {
        url: '/chef-current-menu',
        views: {
            '': {templateUrl: '../../views/chef-current-menu.html'},
            //child view
            'miniNav@chef-current-menu': {
                templateUrl: '../../views/profile-nav-bar.html'
            }
        }
    });

    // chef dashboard route.
    $stateProvider.state('chef-dashboard', {
        url: '/chef-dashboard',
        views: {
            '': {templateUrl: '../../views/chef-dashboard.html'},
            //child view
            'miniNav@chef-dashboard': {
                templateUrl: '../../views/profile-nav-bar.html'
            }
        }
    });

    // chef-menu-order route.
    $stateProvider.state('chef-menu-order', {
        url: '/chef-menu-orders',
        views: {
            '': {templateUrl: '../../views/chef-menu-order.html'},
            //child view
            'miniNav@chef-menu-order': {
                templateUrl: '../../views/profile-nav-bar.html'
            }
        }
    });

    // chef menu order requirements route.
    $stateProvider.state('chef-menu-orderreqs', {
        url: '/chef-menu-order-requirements',
        views: {
            '': {templateUrl: '../../views/chef-menu-orderreqs.html'},
            //child view
            'miniNav@chef-menu-orderreqs': {
                templateUrl: '../../views/profile-nav-bar.html'
            }
        }
    });

    // profile-reviews route.
    $stateProvider.state('profile-reviews', {
        url: '/profile-reviews',
        views: {
            '': {templateUrl: '../../views/show-reviews.html'},
            //child view
            'miniNav@profile-reviews': {
                templateUrl: '../../views/profile-nav-bar.html'
            },
            controller: 'ShowReviewsController'
        }
    });

    // submit-reviews route.
    $stateProvider.state('submit-review', {
        url: '/submit-review',
        views: {
            '': {templateUrl: '../../views/submit-review.html'},
            //child view
            'miniNav@profile-reviews': {
                templateUrl: '../../views/profile-nav-bar.html'
            },
            controller: 'SubmitReviewsController'
        }
    });

    // user-orders route.
    $stateProvider.state('user-orders', {
        url: '/user-orders',
        views: {
            '': {templateUrl: '../../views/user-orders.html'},
            //child view
            'miniNav@user-orders': {
                templateUrl: '../../views/profile-nav-bar.html'
            }
        }
    });

    // user-profile-photo route.
    $stateProvider.state('profile-photo-upload', {
        url: '/profile-photo-upload-settings',
        views: {
            '': {templateUrl: '../../views/profile-photo-upload.html'},
            //child view
            'miniNav@profile-photo-upload': {
                templateUrl: '../../views/profile-nav-bar.html'
            },
            controller: 'ProfileImageController'
        }
    });

    // Update Menu route.
    $stateProvider.state('update-menu', {
        url: '/update-menu-add-meal',
        views: {
            '': {templateUrl: '../../views/update-menu.html'},
            //child view
            'miniNav@update-menu': {
                templateUrl: '../../views/profile-nav-bar.html'
            },
            controller: 'UpdateMenuController'
        }
    });

    // Past Menu route.
    $stateProvider.state('past-menu', {
        url: '/past-menu',
        views: {
            '': {templateUrl: '../../views/past-menu.html'},
            //child view
            'miniNav@past-menu': {
                templateUrl: '../../views/profile-nav-bar.html'
            },
            controller: 'PastMenuController'
        }
    });

    // marketplace order route.
    $stateProvider.state('marketplace-order', {
        url: '/marketplace-order',

    });

    // listing route.
    $stateProvider.state('listing', {
        url: '/listing',
        templateUrl: '../../views/listing.html'
    });



	$httpProvider.interceptors.push(function ($q, $localStorage) {
	   return {
	       'request': function (config) {
	           config.headers = config.headers || {};
	           if ($localStorage.token) {
	               config.headers.Authorization = 'Bearer ' + $localStorage.token;
	           	}
	           return config;
	       },
	       'responseError': function (response) {
	           if (response.status === 401 || response.status === 403) {
	               alert("Token expired. Please login again");
	           }
	           return $q.reject(response);
	       }
	   };
	});

	function guest($q, $location, $localStorage) {
		var defer = $q.defer();

		if ($localStorage.token) {
			defer.reject();
			$location.path("/login");
		} else {
			defer.resolve();
		}

		return defer.promise;
	}

	function auth($q, $location, $localStorage) {
		var defer = $q.defer();

		if ($localStorage.token) {
			defer.resolve();
		} else {
			defer.reject();
			$location.path("/login");
		}

		return defer.promise;
	}
});
