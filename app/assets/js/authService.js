"use strict";
angular.module('OrchidApp')
    .factory('authService', function ($http, $localStorage, $location) {
	var apiurl = 'https://api.orchideats.com/api';

	function urlBase64Decode(str) {
		var output = str.replace('-', '+').replace('_', '/');
		switch (output.length % 4) {
		   case 0:
		       break;
		   case 2:
		       output += '==';
		       break;
		   case 3:
		       output += '=';
		       break;
		   default:
		       throw 'Illegal base64url string!';
		}
		return window.atob(output);
	}

	return {
        login: function (data, success, error) {
            $http({method: 'POST', url: apiurl + '/login', data: data, headers: "Access-Control-Allow-Origin: *"})
                .then(success, error);
                // .catch(error);
        },
        signup: function (data, success, error) {
            $http({method: 'POST', url: apiurl + '/signup', data: data, headers: "Access-Control-Allow-Origin: *"})
                .then(success, error);
        },
        forgotPassword: function (data, success, error) {
            $http.post(apiurl + '/forgotPassword', data).then(success, error);
        },
        resetPasswordValidityRequest: function (data, success, error) {
            $http.post(apiurl + '/resetPasswordValidityRequest', data).then(success, error);
        },
        resetPassword: function (data, success, error) {
            $http.post(apiurl + '/resetPassword', data).then(success, error);
        },
        getClaimsFromToken: function (token) {
            var user = {};
            if (typeof token !== undefined) {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        },
        admin: {
            users: function (success, error) {
                $http({method: 'GET', url: apiurl + '/adminUsers', headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            orders: function (success, error) {
                $http({method: 'GET', url: apiurl + '/adminOrders', headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            delivery: function (success, error) {
                $http({method: 'GET', url: apiurl + '/adminDelivery', headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            updateUsers: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/updateUsers', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            updateOrders: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/updateOrders', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            updateAdmin: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/updateAdmin', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            updateDelivery: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/updateDelivery', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            delete: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/deleteUser', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            cancel: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/cancelOrder', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        profile: function (params, success, error) {
            $http.get(apiurl + '/profile/' + params).then(success, error);
        },
        editProfile: {
            get: function (params, success, error) {
                $http({method: "GET", url: apiurl + "/editProfile/" + params, headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/editProfile',
                    data: data,	headers: {'Content-Type' : 'application/json'}
                }).then(success, error);
            }
        },
        updatePassword: function (data, success, error) {
            $http({method: 'POST', url: apiurl+ '/updatePassword',
                data: data,	headers: {'Content-Type' : 'application/json'}
            }).then(success, error);
        },
		accountNotifications: {
            get: function (params, success, error) {
                $http({method: "GET", url: apiurl + "/accountNotifications/" + params, headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/accountNotifications',
                    data: data,	headers: {'Content-Type' : 'application/json'}
                }).then(success, error);
            }
		},
		reviews: {
            get: function (params, success, error) {
                $http({method: "GET", url: apiurl + "/reviews/" + params, headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/reviews',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
		},
		menu: {
            current: function (params, success, error) {
                $http({method: "GET", url: apiurl + '/currentMenu/' + params, headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            past: function (params, success, error) {
                $http({method: 'GET', url: apiurl + '/pastMeals/' + params, headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            update: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/updateMenu', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            delete: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/deleteMenu', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        payment: function (data, url, success, error) {
                $http({method: "POST", url: apiurl + url, data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
        dashboard: {
            get: function (success, error) {
                $http({method: "GET", url: apiurl + "/dashboard", headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            stripeAuthorize: function (success, error) {
                $http({method: "GET", url: apiurl + "/authorize"}).then(success, error);
            },
            stripeToken: function (data, success, error) {
                $http({method: "POST", url: apiurl + "/token", data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            loginLink: function (success, error) {
                $http({method: "GET", url: apiurl + "/loginLink", headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            }
        },
        orders: {
            pastOrders: function (success, error) {
                $http({
                    method: 'GET',
                    url: apiurl + '/pastOrders',
                    headers: "Access-Control-Allow-Origin: *"
                }).then(success, error);
            },
            upcomingOrders: function (success, error) {
                $http({
                    method: 'GET',
                    url: apiurl + '/upcomingOrders',
                    headers: "Access-Control-Allow-Origin: *"
                }).then(success, error);
            },
            orderHistory: function (success, error) {
                $http({
                    method: 'GET',
                    url: apiurl + '/orderHistory',
                    headers: "Access-Control-Allow-Origin: *"
                }).then(success, error);
            },
            currentOrders: function (success, error) {
                $http({
                    method: 'GET',
                    url: apiurl + '/currentOrders',
                    headers: "Access-Control-Allow-Origin: *"
                }).then(success, error);
            },
            completed: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/completeOrder',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        directory: function (success, error) {
                $http({method: 'GET', url: apiurl + '/directory', headers: "Access-Control-Allow-Origin: *"
                }).then(success, error);
        },
        listing: {
            get: function (params, success, error) {
                $http({method: 'GET', url: apiurl + '/marketplace-listing/'+ params}).then(success, error);
            }
        },
        chefSettings: {
            get: function (success, error) {
                $http({method: 'GET', url: apiurl + '/chefSettings'}).then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/chefSettings', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        cart: {
            get: function (success, error) {
                $http({method: 'GET', url: apiurl + '/shoppingCart'}).then(success, error);
            },
            chefData: function (params, success, error) {
                $http({method: 'GET', url: apiurl + '/chefData/' + params}).then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/shoppingCart', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            update: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/updateCart', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            delete: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/deleteCart', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        profilePhoto: {
            get: function (success, error) {
                $http({method: 'GET', url: apiurl + '/profilePhoto'}).then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/updatePhoto', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        meal: {
            get: function (params, success, error) {
                $http({method: 'GET', url: apiurl + '/editMeal/' + params, headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/addMeal',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        gallery: {
            get: function (params, success, error) {
                $http({method: 'GET', url: apiurl + '/getGallery/' + params, headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/addPhoto',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            remove: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/remove',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        emailList: {
            get: function (success, error) {
                $http({method: 'GET', url: apiurl + '/emails', headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/emails',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            delete: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/deleteEmail',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            send: function(data, success, error) {
                $http({method: 'POST', url: apiurl+ '/sendEmails',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            },
            customer: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/customerEmail', data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        inbox: {
            get: function (success, error) {
                $http({method: 'GET', url: apiurl + '/inbox', headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            delete: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/deleteMessage',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        webhook: function (success, error) {
            $http({method: 'GET', url: apiurl + '/webhooks', headers: "Access-Control-Allow-Origin: *"}).then(success, error);
        }
    }
});
