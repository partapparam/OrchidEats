<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(OrchidEats\Models\User::class, 50)->create();
        factory(OrchidEats\Models\Chef::class, 10)->create();
        factory(OrchidEats\Models\Profile::class, 50)->create();
        factory(OrchidEats\Models\Order::class, 10)->create();
        factory(OrchidEats\Models\Rating::class, 10)->create();
        factory(OrchidEats\Models\Meal::class, 10)->create();
        factory(OrchidEats\Models\Diet::class, 10)->create();
    }
}
