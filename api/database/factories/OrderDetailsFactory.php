<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\OrderDetails::class, function (Faker $faker) {
    static $order = 1;
    static $meal = 1;

    return [
        'order_id' => $order++,
        'meal_id' => $meal++,
        'quantity' => $faker->randomDigit,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
