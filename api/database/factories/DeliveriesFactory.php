<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Deliveries::class, function (Faker $faker) {
    static $order = 1;
    return [
        'delivery_address' => $faker->streetAddress,
        'completed' => $faker->randomDigit,
        'order_id' => $order++,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
