<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Rating::class, function (Faker $faker) {
    static $order = 1;
    static $meal = 1;
    static $id = 1;

    return [
        'ratings_user_id' => $order++,
        'ratings_chef_id' => $meal++,
        'rating' => $faker->randomDigit,
        'review' => $faker->text($maxNbChars = 200),
        'chef_feedback' => $faker->text($maxNbChars = 200),
        'ratings_order_id' => $id++,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});


