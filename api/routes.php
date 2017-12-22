<?php

use OrchidEats\Core\Route;

Route::get('index.php', 'AuthController@index');
Route::get('register', 'AuthController@register');
Route::get('login', 'AuthController@login');

// Protected routes.
Route::middleware('VerifyToken', function () {
	Route::get('profile', 'AuthController@profile');
});
