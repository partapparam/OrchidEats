"use strict";

const OrchidApp = angular.module('OrchidApp', [
    'ui.router',
    'ngStorage', 'ngCookies', 'ui.bootstrap', 'ngMessages', 'angularFileUpload', 'ui-notification', 'angular-loading-bar'
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

    // admin route.
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: view('admin'),
        controller: 'AdminController'
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
        url: '/profile',
        views: {
            '': {templateUrl: view('profile-page')},
            //child view
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

    // Signup route.
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: view('authentication/signup'),
        resolve: {
            guest: guest
        }
    });

    // Marketplace route.
    $stateProvider.state('marketplace', {
        url: '/marketplace',
        templateUrl: view('marketplace'),
        controller: 'MarketController'
    });

    // Orders route.
    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: view('user-orders'),
        controller: 'OrdersController',
        resolve: {
            guest: auth
        }
    });

    // About route.
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: view('about')
    });

    // Privacy route.
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

    // How It Works route.
    $stateProvider.state('learn-more', {
        url: '/learn-more',
        templateUrl: view('learn-more')
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
            },
            controller: 'DashboardController'
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
            '': {templateUrl: view('show-reviews')},
            //child view
            'miniNav@profile-reviews': {
                templateUrl: view('profile-nav-bar')
            },
            controller: 'ReviewsController'
        },
        method: 'reviews'
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
            controller: 'MenuController'
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
            controller: 'MenuController'
        },
        method: 'menu'
    });

    // marketplace order route.
    $stateProvider.state('confirm-order', {
        url: '/confirm-order',
        templateUrl: '../../views/marketplace-order.html'
    });

    // listing route.
    $stateProvider.state('listing', {
        url: '/listing',
        templateUrl: '../../views/listing.html'
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