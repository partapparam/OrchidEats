<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Chefs::class, function (Faker $faker) {

    static $order = 1;

    return [
        'user_id' => $order++,
        'food_handler' => $faker->unique()->randomNumber($nbDigits = NULL, $strict = false),
        'min_order' => $faker->randomDigit,
        'order_limit' => $faker->randomDigit,
        'pickup_address' => $faker->streetAddress,
        'pickup' => $faker->randomDigit,
        'oe_delivery' => $faker->randomDigit,
        'per_delivery' => $faker->randomDigit,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
