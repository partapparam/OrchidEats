<?php

$api = app('Dingo\Api\Routing\Router');

$api->version("v1", function ($api) {
    $api->get("/", function () {
        return response()->json([
            'status' => 'success'
        ], 200);
    });

    $api->post("signup", "OrchidEats\Http\Controllers\AuthController@signup");
    $api->post("login", "OrchidEats\Http\Controllers\AuthController@login");

    # Protected routes
    $api->group(['middleware' => 'jwt.auth'], function ($api) {
        $api->post("logout", "OrchidEats\Http\Controllers\AuthController@logout");
        $api->get("profile", "OrchidEats\Http\Controllers\AuthController@profile");
    });

});