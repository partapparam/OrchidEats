<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChefsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chefs', function (Blueprint $table) {
            $table->increments('chef_id')->unsigned();
            $table->string('food_handler')->nullable();
            $table->integer('min_per_order')->nullable();
            $table->integer('weekly_order_limit')->nullable();
            $table->string('order_deadline')->nullable();
            $table->boolean('pickup')->default(0)->nullable();
            $table->boolean('oe_delivery')->default(1)->nullable();
            $table->boolean('per_delivery')->default(0)->nullable();
            $table->string('delivery_date')->nullable();
            $table->string('delivery_window')->nullable();
            $table->integer('chefs_user_id')->unique()->unsigned()->nullable();
            $table->timestamps();
            $table->foreign('chefs_user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chefs');
    }
}
