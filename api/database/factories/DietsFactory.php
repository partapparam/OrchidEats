<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Diet::class, function (Faker $faker) {
    static $order = 1;

    return [
        'diets_chef_id' => $order++,
        'keto' => $faker->randomDigit,
        'paleo' => $faker->randomDigit,
        'high_fat' => $faker->randomDigit,
        'low_carb' => $faker->randomDigit,
        'high_protein' => $faker->randomDigit,
        'vegan' => $faker->randomDigit,
        'vegetarian' => $faker->randomDigit,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
