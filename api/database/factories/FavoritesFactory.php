<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Favorites::class, function (Faker $faker) {
    static $order = 1;
    static $ordr = 1;

    return [
        'user_id' => $order++,
        'chef_id' => $ordr++,
        'following' => $faker->randomDigit,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
