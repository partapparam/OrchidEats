<?php

use Faker\Generator as Faker;

$factory->define(OrchidEats\Models\Profile::class, function (Faker $faker) {

    static $static = 'male';
    static $order = 1;

    return [
        'gender' => $static,
        'dob' => $faker->dateTime($max = 'now'),
        'phone' => $faker->unique()->randomNumber($nbDigits = NULL, $strict = false),
        'address' => $faker->streetAddress,
        'zip' => $faker->postcode,
        'bio' => $faker->text($maxNbChars = 200),
        'prof_pic'=> $faker->image(),
        'email_note' => $faker->randomDigit,
        'text_note' => $faker->randomDigit,
        'profiles_user_id' => $order++,
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
