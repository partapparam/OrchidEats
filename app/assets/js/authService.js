"use strict";

angular.module('OrchidApp')
    .factory('authService', function ($http, $localStorage, $location) {
	var apiurl = 'http://api.orchideats.test/api';

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
        profile: function (success, error) {
            $http.get(apiurl + '/profile').then(success, error);
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
            get: function (success, error) {
                $http({method: 'GET', url: apiurl + '/admin', headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl + '/admin', data: data, headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        editProfile: {
            get: function (success, error) {
                $http({method: "GET", url: apiurl + "/editProfile", headers: "Access-Control-Allow-Origin: *"})
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
            get: function (success, error) {
                $http({method: "GET", url: apiurl + "/accountNotifications", headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/accountNotifications',
                    data: data,	headers: {'Content-Type' : 'application/json'}
                }).then(success, error);
            }
		},
		reviews: {
            get: function (success, error) {
                $http({method: "GET", url: apiurl + "/reviews", headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/reviews',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
		},
		menu: {
            get: function (success, error) {
                $http({method: "GET", url: apiurl + "/menu", headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, success, error) {
                $http({method: 'POST', url: apiurl+ '/menu',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        payment: function (data, success, error) {
            $http({method: "POST", url: apiurl + "/payment", data: data}).then(success, error);
        },
        dashboard: {
            get: function (success, error) {
                $http({method: "GET", url: apiurl + "/dashboard", headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            stripeAuthorize: function (success, error) {
                $http({method: "GET", url: apiurl + "/authorize"}).then(success, error);
            },
            stripeToken: function (data, success, error) {
                $http({method: "GET", url: apiurl + "/token"}).then(success, error);
            }
        },
        orders: {
            pastOrders: function (success, error) {
                $http({
                    method: "GET",
                    url: apiurl + "/pastOrders",
                    headers: "Access-Control-Allow-Origin: *"
                }).then(success, error);
            },
            upcomingOrders: function (success, error) {
                $http({
                    method: "GET",
                    url: apiurl + "/pastOrders",
                    headers: "Access-Control-Allow-Origin: *"
                }).then(success, error);
            }
        },
        marketplace: function (success, error) {
                $http({method: 'GET', url: apiurl + '/marketplace', headers: "Access-Control-Allow-Origin: *"
                }).then(success, error);
        },
        listing: {
            get: function (params, success, error) {
                $http({method: 'GET', url: apiurl + '/marketplace/'+ params}).then(success, error);
            }
        }
    }
});