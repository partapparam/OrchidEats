<?php

use OrchidEats\Core\Route;

Route::get('index.php', 'AuthController@index');
Route::post('signup', 'AuthController@signup');
Route::post('login', 'AuthController@login');

// Protected routes.
Route::get('profile', 'AuthController@profile', 'VerifyToken');
Route::get('edit-profile', 'AuthController@edit_profile', 'VerifyToken');
