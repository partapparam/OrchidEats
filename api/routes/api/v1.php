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

//    marketplace routes
    $api->get("directory", "OrchidEats\Http\Controllers\DirectoryController@index");
    $api->get("marketplace-listing/{id}", "OrchidEats\Http\Controllers\DirectoryController@show");

//    profile page
    $api->get("profile/{id}", "OrchidEats\Http\Controllers\ProfileController@profile");
    $api->get("reviews/{id}", "OrchidEats\Http\Controllers\ProfileController@reviews");
    $api->get("currentMenu/{id}", "OrchidEats\Http\Controllers\MenuController@current");
    $api->get("getGallery/{id}", "OrchidEats\Http\Controllers\GalleryController@get");

//    webhooks controller
    $api->post('account', 'OrchidEats\Http\Controllers\WebhookController@account');
    $api->post('connect', 'OrchidEats\Http\Controllers\WebhookController@connect');

//    gets messages from websocket
        $api->get('inbox/{id}', 'OrchidEats\Http\Controllers\InboxController@show');
    $api->get('messages/{id}', 'OrchidEats\Http\Controllers\InboxController@messages');

//    add email from profile page for non-user
    $api->post('customerEmail', 'OrchidEats\Http\Controllers\EmailListController@customer');

    # Protected routes
    $api->group(['middleware' => 'jwt.auth'], function ($api) {
//        auth controller
        $api->post("logout", "OrchidEats\Http\Controllers\AuthController@logout");
        $api->post('updatePassword', 'OrchidEats\Http\Controllers\AuthController@updatePassword');

//        admin controller
        $api->get('adminUsers', 'OrchidEats\Http\Controllers\AdminController@userData');
        $api->get('adminOrders', 'OrchidEats\Http\Controllers\AdminController@orderData');
        $api->get('adminDelivery', 'OrchidEats\Http\Controllers\AdminController@deliveryData');
        $api->post('updateUsers', 'OrchidEats\Http\Controllers\AdminController@updateUsers');
        $api->post('updateOrders', 'OrchidEats\Http\Controllers\AdminController@updateOrders');
        $api->post('updateAdmin', 'OrchidEats\Http\Controllers\AdminController@updateAdmin');
        $api->post('updateDelivery', 'OrchidEats\Http\Controllers\AdminController@updateDelivery');
        $api->post('deleteUser', 'OrchidEats\Http\Controllers\AdminController@destroy');
        $api->post('cancelOrder', 'OrchidEats\Http\Controllers\AdminController@cancel');

//        profile controller
        $api->post("reviews", "OrchidEats\Http\Controllers\ProfileController@submitReview");;
        $api->get("profilePhoto", "OrchidEats\Http\Controllers\ProfileController@photo");
        $api->post("updatePhoto", "OrchidEats\Http\Controllers\ProfileController@updatePhoto");

//        Edit Profile controller
        $api->get("editProfile/{id}", "OrchidEats\Http\Controllers\EditProfileController@show");
        $api->post("editProfile", "OrchidEats\Http\Controllers\EditProfileController@store");

//        Notifications Controller
        $api->get("accountNotifications/{id}", "OrchidEats\Http\Controllers\AccountNotificationsController@show");
        $api->post("accountNotifications", "OrchidEats\Http\Controllers\AccountNotificationsController@store");

//        menu Controller
        $api->get("pastMeals/{id}", "OrchidEats\Http\Controllers\MenuController@past");
        $api->post("updateMenu", "OrchidEats\Http\Controllers\MenuController@update");
        $api->post("deleteMenu", "OrchidEats\Http\Controllers\MenuController@destroy");

//        Chef Settings Controller
        $api->get("chefSettings", "OrchidEats\Http\Controllers\ChefSettingsController@get");
        $api->post("chefSettings", "OrchidEats\Http\Controllers\ChefSettingsController@post");

//        meal controller
        $api->get("editMeal/{id}", "OrchidEats\Http\Controllers\MealController@edit");
        $api->post("addMeal", "OrchidEats\Http\Controllers\MealController@store");
        $api->get("mealPhoto", "OrchidEats\Http\Controllers\MealController@photo");


//        Stripe controllers
        $api->get("authorize", "OrchidEats\Http\Controllers\StripesController@stripeAuthorize");
        $api->post("token", "OrchidEats\Http\Controllers\StripesController@stripeToken");
        $api->get('loginLink', 'OrchidEats\Http\Controllers\StripesController@loginLink');

//        Dashboard controller
        $api->get("dashboard", "OrchidEats\Http\Controllers\DashboardController@show");

//        Payment Controller
        $api->post("payment", "OrchidEats\Http\Controllers\CheckoutController@charge");

//    Order Controller
        $api->get("pastOrders", "OrchidEats\Http\Controllers\OrdersController@past");
        $api->get("upcomingOrders", "OrchidEats\Http\Controllers\OrdersController@upcoming");
        $api->get("currentOrders", "OrchidEats\Http\Controllers\OrdersController@currentOrders");
        $api->get("orderHistory", "OrchidEats\Http\Controllers\OrdersController@orderHistory");
        $api->post("completeOrder", "OrchidEats\Http\Controllers\OrdersController@completed");

//        Shopping Cart controller
        $api->get('shoppingCart', 'OrchidEats\Http\Controllers\CartController@show');
        $api->post('shoppingCart', 'OrchidEats\Http\Controllers\CartController@store');
        $api->post('updateCart', 'OrchidEats\Http\Controllers\CartController@update');
        $api->post('expireCart', 'OrchidEats\Http\Controllers\CartController@destroy');

//        Email List Controller
        $api->get('emails', 'OrchidEats\Http\Controllers\EmailListController@show');
        $api->post('emails', 'OrchidEats\Http\Controllers\EmailListController@update');
        $api->post('deleteEmail', 'OrchidEats\Http\Controllers\EmailListController@destroy');
        $api->post('sendEmails', 'OrchidEats\Http\Controllers\EmailListController@send');

//        Stripe Webhooks controller
        $api->get('webhooks', 'OrchidEats\Http\Controllers\WebhookController@show');

//        gallery controller
        $api->post("addPhoto", "OrchidEats\Http\Controllers\GalleryController@addPhoto");
        $api->post("remove", "OrchidEats\Http\Controllers\GalleryController@delete");


    });
});