<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Orders::class, function (Faker $faker) {
    static $order = 1;
    static $butt = 1;

    return [
        'user_id' => $order++,
        'chef_id' => $butt++,
        'completed' => $faker->randomDigit,
        'order_total' => 1111.00,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
