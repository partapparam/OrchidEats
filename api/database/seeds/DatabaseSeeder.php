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
//        factory(OrchidEats\Models\User::class, 50)->create();
//        factory(OrchidEats\Models\Chefs::class, 50)->create();
//        factory(OrchidEats\Models\Profile::class, 50)->create();
//        factory(OrchidEats\Models\Ratings::class, 50)->create();
//        factory(OrchidEats\Models\Meals::class, 50)->create();
//        factory(OrchidEats\Models\Orders::class, 50)->create();
//        factory(OrchidEats\Models\Favorites::class, 50)->create();
//        factory(OrchidEats\Models\Diets::class, 50)->create();
//        factory(OrchidEats\Models\Deliveries::class, 50)->create();
        factory(OrchidEats\Models\OrderDetails::class, 10)->create();
    }
}
