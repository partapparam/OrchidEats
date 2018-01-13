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
            $http.post(apiurl + '/login', data).then(success, error);
        },
        logout: function (success, error) {
            $http.post(apiurl + '/loout').then(success, error);
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
        profile: function (success, error) {
            $http.get(apiurl + '/profile').then(success, error);
        },
        getClaimsFromToken: function (token) {
            var user = {};
            if (typeof token !== undefined) {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        },
        editProfile: {
            get: function (data, callback) {
                $http({method: "GET", url: apiurl + "/editProfile", headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, callback) {
                $http({method: 'POST', url: apiurl+ '/editProfile',
                    data: data,	headers: {'Content-Type' : 'application/json'}
                }).then(success, error);
            }
        },
		accountNotifications: {
            get: function (data, callback) {
                $http({method: "GET", url: apiurl + "/accountNotifications", headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, callback) {
                $http({method: 'POST', url: apiurl+ '/accountNotifications',
                    data: data,	headers: {'Content-Type' : 'application/json'}
                }).then(success, error);
            }
		},
		reviews: {
            get: function (data, callback) {
                $http({method: "GET", url: apiurl + "/reviews", headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, callback) {
                $http({method: 'POST', url: apiurl+ '/reviews',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
		},
		menu: {
            get: function (data, callback) {
                $http({method: "GET", url: apiurl + "/menu", headers: "Access-Control-Allow-Origin: *"})
                    .then(success, error);
            },
            post: function (data, callback) {
                $http({method: 'POST', url: apiurl+ '/menu',
                    data: data,	headers: {'Content-Type' : 'application/json'}}).then(success, error);
            }
        },
        payment: function (token) {
            $http({method: "POST", url: apiurl + "/payment", data: token}).then(success, error);
        },
        dashboard: {
            get: function (data, callback) {
                $http({method: "GET", url: apiurl + "/dashboard", headers: "Access-Control-Allow-Origin: *"}).then(success, error);
            },
            stripeAuthorize: function (data) {
                $http({method: "GET", url: apiurl + "/authorize", data: data}).then(success, error);
            },
            stripeToken: function (data) {
                $http({method: "GET", url: apiurl + "/token", data: data}).then(success, error);
            },
        }

    }
});
