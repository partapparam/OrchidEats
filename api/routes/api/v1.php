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

    # Password reset
    $api->post("forgotPassword", "OrchidEats\Http\Controllers\AuthController@forgotPassword");
    $api->post("resetPasswordValidityRequest", "OrchidEats\Http\Controllers\AuthController@resetPasswordValidityRequest");
    $api->post("resetPassword", "OrchidEats\Http\Controllers\AuthController@resetPassword");

    # Protected routes
//    will this make sure that the id is approved for every controller request
    $api->group(['middleware' => 'jwt.auth'], function ($api) {
//        auth controller
        $api->post("logout", "OrchidEats\Http\Controllers\AuthController@logout");
        $api->post('updatePassword', 'OrchidEats\Http\Controllers\AuthController@updatePassword');

//        admin controller
        $api->get('admin', 'OrchidEats\Http\Controllers\AdminController@show');
        $api->post('admin', 'OrchidEats\Http\Controllers\AdminController@update');

//        profile controller
        $api->get("profile", "OrchidEats\Http\Controllers\ProfileController@profile");
        $api->get("reviews", "OrchidEats\Http\Controllers\ProfileController@show");
        $api->post("reviews", "OrchidEats\Http\Controllers\ProfileController@store");
        $api->get("order-requirements", "OrchidEats\Http\Controllers\ProfileController@orderReqs");
        $api->post("order-requirements", "OrchidEats\Http\Controllers\ProfileController@updateOrderReqs");

//        Edit Profile controller
        $api->get("editProfile", "OrchidEats\Http\Controllers\EditProfileController@show");
        $api->post("editProfile", "OrchidEats\Http\Controllers\EditProfileController@store");

//        Notifications Controller
        $api->get("accountNotifications", "OrchidEats\Http\Controllers\AccountNotificationsController@show");
        $api->post("accountNotifications", "OrchidEats\Http\Controllers\AccountNotificationsController@store");

//        menu Controller
        $api->get("currentMenu", "OrchidEats\Http\Controllers\MenuController@current");
        $api->post("menu", "OrchidEats\Http\Controllers\MenuController@store");
        $api->get("pastMenu", "OrchidEats\Http\Controllers\MenuController@past");
        $api->post("updateMenu", "OrchidEats\Http\Controllers\MenuController@update");
        $api->post("deleteMenu", "OrchidEats\Http\Controllers\MenuController@destroy");

//        Stripe controllers
        $api->get("authorize", "OrchidEats\Http\Controllers\StripesController@authorize");
        $api->get("token", "OrchidEats\Http\Controllers\StripesController@token");

//        Dashboard controller
        $api->get("dashboard", "OrchidEats\Http\Controllers\DashboardController@show");

//        Payment Controller
        $api->post("payment", "OrchidEats\Http\Controllers\CheckoutController@charge");

//        Marketplace Controller
        $api->get("marketplace", "OrchidEats\Http\Controllers\MarketplaceController@index");
    });
    $api->get("marketplace/{id}", "OrchidEats\Http\Controllers\MarketplaceController@show");

//    Orders Controller
    $api->get("pastOrders", "OrchidEats\Http\Controllers\OrdersController@past");
    $api->get("upcomingOrders", "OrchidEats\Http\Controllers\OrdersController@upcoming");
    $api->get("incompleteOrders", "OrchidEats\Http\Controllers\OrdersController@incompleteOrders");
    $api->get("orderHistory", "OrchidEats\Http\Controllers\OrdersController@orderHistory");

});