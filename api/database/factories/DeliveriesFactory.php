<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Delivery::class, function (Faker $faker) {
    static $order = 1;
    return [
        'delivery_address' => $faker->streetAddress,
        'completed' => 0,
        'deliveries_order_id' => $order++,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
