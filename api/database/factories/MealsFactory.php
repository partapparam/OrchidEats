<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Meals::class, function (Faker $faker) {
    static $order = 1;

    return [
        'chef_id' => $order++,
        'rating' => $faker->randomDigit,
        'name' => $faker->word,
        'type' => $faker->word,
        'calories' => $faker->randomDigit,
        'protein' => $faker->randomDigit,
        'carbs' => $faker->randomDigit,
        'fat' => $faker->randomDigit,
        'description' => $faker->text($maxNbChars = 200),
        'price' => $faker->randomDigit,
        'photo' => $faker->image(),
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
