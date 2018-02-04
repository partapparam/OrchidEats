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
        'od_order_id' => $order++,
        'meal_details' => json_encode([
            "0" => [
                "meal_id" => "1",
                "meals_chef_id" => "1",
                "user_id" => "43",
                "quantity" => "8",
                "price" => "10",
                "name" => "meal name"
            ],
            "1" => [
                "meal_id" => "1",
                "meals_chef_id" => "1",
                "user_id" => "43",
                "quantity" => "8",
                "price" => "10",
                "name" => "meal name"
            ],
            "2" => [
                "meal_id" => "1",
                "meals_chef_id" => "1",
                "user_id" => "43",
                "quantity" => "8",
                "price" => "10",
                "name" => "meal name"
            ],
        ]),
        'delivery_date' => 'friday',
        'delivery_window' => '4-8 pm',
        'created_at' => $faker->dateTime($max = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
