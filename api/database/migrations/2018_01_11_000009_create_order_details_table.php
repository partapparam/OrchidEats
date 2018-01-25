<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->integer('od_order_id')->unsigned();
            $table->integer('od_meal_id')->unsigned();
            $table->integer('quantity');
            $table->timestamps();
            $table->foreign('od_order_id')->references('order_id')->on('orders');
            $table->foreign('od_meal_id')->references('meal_id')->on('meals');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_details');
    }
}
