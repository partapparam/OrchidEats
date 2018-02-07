<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('order_id');
            $table->decimal('order_total', 6, 2);
            $table->integer('quantity');
            $table->boolean('reviewed');
            $table->boolean('completed');
            $table->text('meal_details')->nullable();
            $table->string('chefs_delivery_date');
            $table->string('chefs_delivery_window');
            $table->integer('orders_user_id')->unsigned();
            $table->integer('orders_chef_id')->unsigned();
            $table->timestamps();
            $table->foreign('orders_user_id')->references('id')->on('users');
            $table->foreign('orders_chef_id')->references('chef_id')->on('chefs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}