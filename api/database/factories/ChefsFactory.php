<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Chef::class, function (Faker $faker) {

    static $order = 1;

    return [
        'chefs_user_id' => $order++,
        'food_handler' => $faker->unique()->randomNumber($nbDigits = NULL, $strict = false),
        'min_order' => $faker->randomDigit,
        'order_limit' => $faker->randomDigit,
        'pickup' => 0,
        'oe_delivery' => 1,
        'per_delivery' => 0,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
