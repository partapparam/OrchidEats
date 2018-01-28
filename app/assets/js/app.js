"use strict";

const OrchidApp = angular.module('OrchidApp', [
    'ui.router',
    'ngStorage',
    'ngCookies',
    'ui.bootstrap',
    'ngMessages',
    'angularFileUpload',
    'ui-notification',
    'angular-loading-bar',
    'ui.router.state.events'
]);

/**
 * View function.
 *
 * @param fileWithPath
 * @returns {string}
 */
function view(fileWithPath) {
    return '../../views/' + fileWithPath + '.html';
}

//Make sure to include ui-router case-sensitive code into the config file and change default settings for having
// forward slash at the end of the url

OrchidApp.config(function ($stateProvider, $locationProvider, $httpProvider, $qProvider, $urlRouterProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    // Landing route.
    $stateProvider.state('landing', {
        url: '/',
        templateUrl: view('landing-page')
    });
    // About route.
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: view('about')
    });
    // Privacy policy route.
    $stateProvider.state('privacy', {
        url: '/privacy-policy',
        templateUrl:view('privacy-policy')
    });
    // FAQs route.
    $stateProvider.state('faqs', {
        url: '/faqs',
        templateUrl: view('faqs-page'),
        controller: 'FaqController'
    });
    // Apply to Cook route.
    $stateProvider.state('cooking-info', {
        url: '/apply-to-cook',
        templateUrl: view('cooking-info')
    });
    // Terms of Use route.
    $stateProvider.state('terms', {
        url: '/terms-of-use',
        templateUrl: view('terms-of-use')
    });
    // Safety route.
    $stateProvider.state('safety', {
        url: '/safety',
        templateUrl: view('safety')
    });
    // How It Works/Learn more route.
    $stateProvider.state('learn-more', {
        url: '/learn-more',
        templateUrl: view('learn-more')
    });

    // admin route.
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: view('admin'),
        // controller: 'AdminController'
    });

    // Signup route.
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: view('authentication/signup'),
        resolve: {
            guest: guest
        }
    });
    // Login route.
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: view('authentication/login'),
        resolve: {
            guest: guest
        }
    });
    // Forgot password route.
    $stateProvider.state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: view('authentication/forgot-password'),
        resolve: {
            guest: guest
        }
    });
    // Password reset route.
    $stateProvider.state('passwordReset', {
        url: '/passwordReset',
        templateUrl: view('authentication/password-reset'),
        resolve: {
            guest: guest,
            isValidRequest: isValidPasswordResetRequest
        }
    });

    // User area route.
    $stateProvider.state('profile', {
        url: '/profile/:id',
        views: {
            '': {templateUrl: view('profile-page')},
            //child views
            'menuSection@profile': {
                templateUrl: view('chef-current-menu')
            },
            'reviewSection@profile': {
                templateUrl: view('show-reviews')
            },
            controller: 'ProfileController'
        },
        method: 'profile',
        resolve: {
            guest: auth
        }
    });
    // edit profile route.
    $stateProvider.state('edit-profile', {
        url: '/edit-profile',
        views: {
            '': {templateUrl: view('edit-profile')},
            //child view
            'miniNav@edit-profile': {
                templateUrl: view('profile-nav-bar')
            },
            controller: 'EditProfileController'
        },
        method: 'editProfile'
    });
    // Account-notifications route.
    $stateProvider.state('account-notifications', {
        url: '/account-notifications-settings',
        views: {
            '': {templateUrl: view('account-notifications')},
            //child view
            'miniNav@account-notifications': {
                templateUrl: view('profile-nav-bar')
            },
            controller: 'AccountNotificationController'
        },
        method: 'accountNotifications'
    });
    //Account Payment Settings - not needed due to stripe express account
    // account-payment route.
    // $stateProvider.state('account-payment', {
    //     url: '/account-payment-settings',
    //     views: {
    //         '': {templateUrl: '../../views/account-payment.html'},
    //         //child view
    //         'miniNav@account-payment': {
    //             templateUrl: '../../views/profile-nav-bar.html'
    //         }
    //     }
    // });
    // profile-reviews route.
    $stateProvider.state('profile-reviews', {
        url: '/profile-reviews',
        views: {
            '': {templateUrl: view('profile-reviews')},
            //child view
            'miniNav@profile-reviews': {
                templateUrl: view('profile-nav-bar')},
            'reviewSection@profile-reviews': {
                templateUrl: view('show-reviews')},
            controller: 'ReviewsController'
        },
        method: 'reviews'
    });
    // account-password-settings route.
    $stateProvider.state('account-password', {
        url: '/account-password-settings',
        views: {
            '': {templateUrl: view('account-password')},
            //child view
            'miniNav@account-password': {
                templateUrl: view('profile-nav-bar')
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

    // Marketplace route.
    $stateProvider.state('marketplace', {
        url: '/marketplace',
        views: {
            '': {templateUrl: view('marketplace')},
            //child view
            'listing@marketplace': {
                templateUrl: view('listing')
            },
            controller: 'MarketController'
        },
        resolve: {
            guest: auth
        }
    });
    // listing page route.
    $stateProvider.state('marketplace-listing', {
        url: '/marketplace-listing/:id',
        templateUrl: view('marketplace-listing'),
        controller: 'ListingController',
        resolve: {
            guest: auth
        }
    });
    //checkout page
    $stateProvider.state('marketplace-listing/:id/checkout', {
        url: '/marketplace-listing/:id/checkout',
        templateUrl: view('checkout'),
        controller: 'CheckoutController',
        resolve: {
            guest: auth
        },
        method: 'getCart'
    });

    // past-orders route.
    $stateProvider.state('past-orders', {
        url: '/past-orders',
        views: {
            '': {templateUrl: view('past-orders')},
            //child view
            'miniNav@past-orders': {
                templateUrl: view('profile-nav-bar')
            },
            // controller: 'OrdersController'
        },
        method: 'pastOrders'
    });
    // upcoming-orders route.
    $stateProvider.state('upcoming-orders', {
        url: '/upcoming-orders',
        views: {
            '': {templateUrl: view('upcoming-orders')},
            //child view
            'miniNav@upcoming-orders': {
                templateUrl: view('profile-nav-bar')
            },
            // controller: 'OrdersController'
        },
        method: 'upcomingOrders'
    });

    // chef current menu route.
    $stateProvider.state('chef-current-menu', {
        url: '/chef-current-menu',
        views: {
            '': {templateUrl: view('chef-current-menu')},
            //child view
            'miniNav@chef-current-menu': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'currentMenu'
    });
    // chef dashboard route.
    $stateProvider.state('chef-dashboard', {
        url: '/chef-dashboard',
        views: {
            '': {templateUrl: view('chef-dashboard')},
            //child view
            'miniNav@chef-dashboard': {
                templateUrl: view('profile-nav-bar')
            },
        }
    });
    // chef-menu-order route.
    $stateProvider.state('incomplete-orders', {
        url: '/chef-incomplete-orders',
        views: {
            '': {templateUrl: view('incomplete-orders')},
            //child view
            'miniNav@incomplete-orders': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'incompleteOrders'
    });
    $stateProvider.state('chef-orders-history', {
        url: '/chef-orders-history',
        views: {
            '': {templateUrl: view('chef-orders-history')},
            //child view
            'miniNav@chef-orders-history': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'orderHistory'
    });
    // chef menu order requirements route.
    $stateProvider.state('chef-menu-orderreqs', {
        url: '/chef-menu-order-requirements',
        views: {
            '': {templateUrl: view('chef-menu-orderreqs')},
            //child view
            'miniNav@chef-menu-orderreqs': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'orderReqs'
    });
    // Update Menu route.
    $stateProvider.state('update-menu', {
        url: '/update-menu-add-meal',
        views: {
            '': {templateUrl: view('update-menu')},
            //child view
            'miniNav@update-menu': {
                templateUrl: view('profile-nav-bar')
            },
            controller: 'MenuController'
        }
    });
    // Past Menu route.
    $stateProvider.state('past-menu', {
        url: '/past-menu',
        views: {
            '': {templateUrl: view('past-menu')},
            //child view
            'miniNav@past-menu': {
                templateUrl: view('profile-nav-bar')
            },
            controller: 'MenuController'
        },
        method: 'pastMenu'
    });


    // submit-reviews route.
    $stateProvider.state('submit-review', {
        url: '/submit-review',
        views: {
            '': {templateUrl: view('submit-review')},
            //child view
            'miniNav@profile-reviews': {
                templateUrl: view('profile-nav-bar')
            },
            controller: 'ReviewsController'
        },
        method: 'reviews'
    });
    // Payment route.
    $stateProvider.state('order-payment', {
        url: '/order-payment',
        templateUrl: '../../views/order-payment.html',
        controller: 'PaymentController'
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
                    alert("Check App.js interceptor");
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

    function isValidPasswordResetRequest($q, $location, authService, Notification) {
        var defer = $q.defer();

        if ($location.search().hasOwnProperty('email') && $location.search().hasOwnProperty('token')) {
            var data = {
                'email': $location.search().email,
                'token': $location.search().token
            };

            authService.resetPasswordValidityRequest(data, function (res) {
                res = res.data;

                if (res.status === 'success' && res.message === 'request_valid') {
                    defer.resolve();
                }
            }, function (res) {
                res = res.data;

                if (res.status_code === 422) {
                    for (var error in res.errors) {
                        for (var i = 0; i < res.errors[error].length; i++) {
                            Notification.error(res.errors[error][i]);
                        }
                    }
                    Notification.error(res.message);
                    defer.reject();
                } else if (res.status_code === 400) {
                    Notification.error(res.message);
                    defer.reject();
                }
            });
        } else {
            defer.reject();
            Notification.error('Invalid request');
        }

        return defer.promise;
    }
});