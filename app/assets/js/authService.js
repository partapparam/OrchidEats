"use strict";

app.factory('authService', function ($http) {
	var apiurl = "http://api.orchideats.test";

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
		register: function (data, success, error) {
			$http.post(apiurl + '/register', data).then(success, error);
		},
		profile: function (success, error) {
			$http.get(apiurl + '/profile', data).then(success, error);
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
