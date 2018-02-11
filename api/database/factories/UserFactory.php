<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(OrchidEats\Models\User::class, function (Faker $faker) {
    static $password = "parameatswithorchid";

    return [
        'first_name' => 'Param',
        'last_name' => 'Singh',
        'email' => 'paramsingh1961@gmail.com',
        'password' => $password,
        'is_chef' => 0,
        'is_admin' => 0,
        'stripe_user_id' => null,
        'remember_token' => null,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
