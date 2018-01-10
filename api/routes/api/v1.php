<?php

$api = app('Dingo\Api\Routing\Router');

$api->version("v1", function ($api) {
    $api->get("/", function () {
        return response()->json([
            'status' => 'success'
        ], 200);
    });

    $api->post("signup", "OrchidEats\Http\Controllers\AuthController@signup");
    $api->get("login", "OrchidEats\Http\Controllers\AuthController@login");

    # Protected routes
//    will this make sure that the id is approved for every controller request
    $api->group(['middleware' => 'jwt.auth'], function ($api) {
        $api->post("logout", "OrchidEats\Http\Controllers\AuthController@logout");
        $api->get("profile", "OrchidEats\Http\Controllers\AuthController@profile");
        $api->get("editProfile", "OrchidEats\Http\Controllers\EditProfileController@show");
        $api->post("editProfile", "OrchidEats\Http\Controllers\EditProfileController@store");
        $api->get("accountNotifications", "OrchidEats\Http\Controllers\AccountNotificationsController@show");
        $api->post("accountNotifications", "OrchidEats\Http\Controllers\AccountNotificationsController@store");
        $api->get("reviews", "OrchidEats\Http\Controllers\ReviewsController@show");
        $api->post("reviews", "OrchidEats\Http\Controllers\ReviewsController@store");
        $api->get("menu", "OrchidEats\Http\Controllers\MenuController@show");
        $api->post("menu", "OrchidEats\Http\Controllers\MenuController@store");
        $api->get("authorize", "OrchidEats\Http\Controllers\StripesController@authorize");
        $api->get("token", "OrchidEats\Http\Controllers\StripesController@token");
        $api->get("dashboard", "OrchidEats\Http\Controllers\DashboardController@show");
        $api->post("payment", "OrchidEats\Http\Controllers\CheckoutController@charge");
    });

});