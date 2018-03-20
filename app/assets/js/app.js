"use strict";

const OrchidApp = angular.module('OrchidApp', [
    'ui.router',
    'ngStorage',
    'ngCookies',
    'ui.bootstrap',
    'ngMessages',
    'ui-notification',
    'angular-loading-bar',
    'ui.router.state.events',
    'ngValidate',
    '720kb.datepicker'
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

OrchidApp.config(function ($stateProvider, $locationProvider, $httpProvider, $qProvider, $urlRouterProvider, $validatorProvider) {
    $validatorProvider.setDefaults({
        errorElement: 'div',
        errorClass: 'label label-danger',
        highlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
        }
    });

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
    $stateProvider.state('admin-users', {
        url: '/admin/users',
        views: {
            '': {templateUrl: view('admin-users'),
                controller: 'AdminController as vm'
            },
            //child view
            'miniNav@admin-users': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'users',
        resolve: {
            deny: denyIfNotAdmin
        }
    });
    $stateProvider.state('admin-orders', {
        url: '/admin/orders',
        views: {
            '': {templateUrl: view('admin-orders'),
                controller: 'AdminController as vm'
            },
            //child view
            'miniNav@admin-orders': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'orders',
        resolve: {
            deny: denyIfNotAdmin
        }
    });
    $stateProvider.state('admin-delivery', {
        url: '/admin/deliveries',
        views: {
            '': {templateUrl: view('admin-delivery'),
                controller: 'AdminController as vm'
            },
            //child view
            'miniNav@admin-delivery': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'delivery',
        resolve: {
            deny: denyIfNotAdmin
        }
    });
    $stateProvider.state('webhook', {
        url: '/admin/webhook',
        views: {
            '': {templateUrl: view('webhook'),
                controller: 'WebhookController as vm'
            },
            //child view
            'miniNav@webhook': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'webhook',
        resolve: {
            deny: denyIfNotAdmin
        }
    });

    // Signup-user route.
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: view('authentication/signup'),
        resolve: {
            guest: guest
        }
    });
    //account-type
    // $stateProvider.state('account-type', {
    //     url: '/signup/account-type',
    //     templateUrl: view('authentication/account-type'),
    //     resolve: {
    //         guest: guest
    //     },
    //     method: 'accountType'
    // });
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
            '': {templateUrl: view('profile-page'),
                controller: 'ProfileController as vm'
            },
            //child views
            'menuSection@profile': {
                templateUrl: view('menu-listing'),
                controller: 'MenuController as vm'
            },
            'reviewSection@profile': {
                templateUrl: view('show-reviews'),
                controller: 'ReviewsController as vm'
            }
        },
        method: 'profile'
        // resolve: {
        //     guest: auth
        // }
    });
    // edit profile route.
    $stateProvider.state('edit-profile', {
        url: '/edit-profile/:id',
        views: {
            '': {templateUrl: view('edit-profile'),
                controller: 'EditProfileController as vm'
            },
            //child view
            'miniNav@edit-profile': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'editProfile'
    });
    // Account-notifications route.
    $stateProvider.state('account-notifications', {
        url: '/account-notifications-settings/:id',
        views: {
            '': {templateUrl: view('account-notifications'),
                controller: 'AccountNotificationController as vm'
            },
            //child view
            'miniNav@account-notifications': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'accountNotifications'
    });
    // profile-reviews route.
    $stateProvider.state('profile-reviews', {
        url: '/profile-reviews/:id',
        views: {
            '': {templateUrl: view('profile-reviews'),
            },
            //child view
            'miniNav@profile-reviews': {
                templateUrl: view('profile-nav-bar')
            },
            'reviewSection@profile-reviews': {
                templateUrl: view('show-reviews'),
                controller: 'ReviewsController as vm'
            }
        },
        method: 'reviews'
    });
    // account-password-settings route.
    $stateProvider.state('account-password', {
        url: '/account-password-settings/:id',
        views: {
            '': {templateUrl: view('account-password')},
            //child view
            'miniNav@account-password': {
                templateUrl: view('profile-nav-bar')
            }
        }
    //    auth controller
    });
    // user-profile-photo route.
    $stateProvider.state('profile-photo-upload', {
        url: '/profile-photo-upload/:id',
        views: {
            '': {templateUrl: view('profile-photo-upload'),
                controller: 'ImageController as vm'
            },
            //child view
            'miniNav@profile-photo-upload': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'photo'
    });
    $stateProvider.state('account-status', {
        url: '/account-status/:id',
        views: {
            '': {templateUrl: view('account-status')
            },
            //child view
            'miniNav@account-status': {
                templateUrl: view('profile-nav-bar')
            }
        }
    });


    // Marketplace route.
    $stateProvider.state('marketplace', {
        url: '/marketplace',
        views: {
            '': {templateUrl: view('marketplace'),
                controller: 'MarketController as vm'
            },
            //child view
            'listing@marketplace': {
                templateUrl: view('listing')
            }
        }
        // resolve: {
        //     guest: auth
        // }
    });
    // listing page route.
    $stateProvider.state('marketplace-listing', {
        url: '/marketplace-listing/:id',
        views: {
            '': {templateUrl: view('marketplace-listing'),
                controller: 'ListingController as vm'
            },
            //child view
            'reviewSection@marketplace-listing': {
                templateUrl: view('show-reviews'),
                controller: 'ReviewsController as vm'
            }
        },
        method: 'marketplace'
    });
    //checkout page
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: view('checkout'),
        controller: 'CheckoutController as vm',
        resolve: {
            guest: auth
        },
        method: 'getCart'
    });

    // User past-orders route.
    $stateProvider.state('past-orders', {
        url: '/past-orders/:id',
        views: {
            '': {templateUrl: view('past-orders'),
                controller: 'OrdersController as vm'
            },
            //child view
            'miniNav@past-orders': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'pastOrders'
    });
    // User upcoming-orders route.
    $stateProvider.state('upcoming-orders', {
        url: '/upcoming-orders/:id',
        views: {
            '': {templateUrl: view('upcoming-orders'),
                controller: "OrdersController as vm"
            },
            //child view
            'miniNav@upcoming-orders': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'upcomingOrders'
    });

    // chef current menu route.
    $stateProvider.state('chef-current-menu', {
        url: '/chef-current-menu/:id',
        views: {
            '': {templateUrl: view('chef-current-menu')},
            //child view
            'miniNav@chef-current-menu': {
                templateUrl: view('profile-nav-bar')
            },
            'menuSection@chef-current-menu': {
                templateUrl: view('menu-listing'),
                controller: 'MenuController as vm'
            }
        },
        method: 'currentMenu'
    });
    // chef dashboard route.
    $stateProvider.state('chef-dashboard', {
        url: '/chef-dashboard',
        views: {
            '': {templateUrl: view('chef-dashboard'),
                controller: 'DashboardController as vm'
            },
            //child view
            'miniNav@chef-dashboard': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'dashboard'
    });
    // chef-menu-order route.
    $stateProvider.state('current-orders', {
        url: '/chef-current-orders/:id',
        views: {
            '': {templateUrl: view('current-orders'),
                controller: 'OrdersController as vm'
            },
            //child view
            'miniNav@current-orders': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'currentOrders'
    });
    $stateProvider.state('chef-orders-history', {
        url: '/chef-orders-history/:id',
        views: {
            '': {templateUrl: view('chef-orders-history'),
                controller: 'OrdersController as vm'
            },
            //child view
            'miniNav@chef-orders-history': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'orderHistory'
    });
    // chef menu order requirements route.
    $stateProvider.state('chef-settings', {
        url: '/chef-settings/:id',
        views: {
            '': {templateUrl: view('chef-settings'),
                controller: 'ChefSettingsController as vm'
            },
            //child view
            'miniNav@chef-settings': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'chefSettings'
    });
    // Update Menu route.
    $stateProvider.state('create-meal', {
        url: '/create-new-meal/:id',
        views: {
            '': {templateUrl: view('create-meal'),
                controller: 'MealController as vm'
            },
            //child view
            'miniNav@create-meal': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: "editMeal"
    });
    // Past Menu route.
    $stateProvider.state('chef-meals', {
        url: '/chef-meals-list/:id',
        views: {
            '': {templateUrl: view('chef-meals'),
                controller: 'MenuController as vm'
            },
            //child view
            'miniNav@chef-meals': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'chefMeals'
    });
    //Customer Feedback Route
    $stateProvider.state('customer-feedback', {
        url: '/customer-feedback',
        views: {
            '': {templateUrl: view('customer-feedback'),
                controller: 'DashboardController as vm'
            },
            //child view
            'miniNav@customer-feedback': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'dashboard'
    });
    $stateProvider.state('email-list', {
        url: '/email-list/:id',
        views: {
            '': {templateUrl: view('email-list'),
                controller: 'EmailListController as vm'
            },
            //child view
            'miniNav@email-list': {
                templateUrl: view('profile-nav-bar')
            }
        },
        method: 'emailList'
    });


    // submit-reviews route.
    $stateProvider.state('submit-review', {
        url: '/submit-review/order/:id',
        views: {
            '': {templateUrl: view('submit-review'),
                controller: 'ReviewsController as vm'
            },
            //child view
            'miniNav@profile-reviews': {
                templateUrl: view('profile-nav-bar')
            }
        }
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
                    alert("There was an error. Please reload the page.");
                //    TODO
                }
                return $q.reject(response);
            }
        };
    });

    function guest($q, $location, $localStorage) {
        var defer = $q.defer();

        if ($localStorage.token) {
            defer.reject();
            $location.path("/");
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

    /**
     * Deny all users if not admin.
     *
     * @param $q
     * @param $localStorage
     * @param $location
     * @param authService
     * @returns {Promise}
     */
    function denyIfNotAdmin($q, $localStorage, $location, authService) {
        var defer = $q.defer();
        if ($localStorage.token) {
            var user = authService.getClaimsFromToken($localStorage.token);

            if (user.data.is_admin === 1) {
                defer.resolve();
            } else {
                window.history.back();
                defer.reject();
            }
        } else {
            defer.reject();
            $location.path('/');
        }

        return defer.promise;
    }
});