<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Order::class, function (Faker $faker) {
    static $order = 1;
    static $butt = 1;

    return [
        'orders_user_id' => $order++,
        'orders_chef_id' => $butt++,
        'completed' => 0,
        'reviewed' => 0,
        'order_total' => 111.00,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
