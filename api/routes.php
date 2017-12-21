<?php

Route::get('index.php', 'AuthController@index');
Route::get('register', 'AuthController@register');
Route::get('login', 'AuthController@login');
