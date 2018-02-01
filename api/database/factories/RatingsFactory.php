<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Ratings::class, function (Faker $faker) {
    static $order = 1;
    static $meal = 1;

    return [
        'user_id' => $order++,
        'chef_id' => $meal++,
        'rating' => $faker->randomDigit,
        'review' => $faker->text($maxNbChars = 200),
    ];
});
