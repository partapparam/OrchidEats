"use strict";

angular.module('OrchidApp')
    .factory('authService', function ($http, $localStorage, $location) {
	var apiurl = 'api.orchideats.test/api';

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
		login: function (data, fn) {
			$http.get(apiurl + '/login', data).then(function success (res) {
				console.log(res);
				$location.path('edit-profile');
			}).catch(function fail (res) {
				console.log('fail')
			});
		},
		signup: function (data, fn) {
			$http.get(apiurl + '/signup', data).then(function success (res) {
                console.log(res);
            }).catch(function fail (res) {
                console.log(res.data.message)
            });
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
		}
	}
});
