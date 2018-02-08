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
            $table->string('min_per_order')->nullable();
            $table->string('weekly_order_limit')->nullable();
            $table->string('order_deadline')->nullable();
            $table->boolean('pickup')->default(0);
            $table->boolean('oe_delivery')->default(1);
            $table->boolean('per_delivery')->default(0);
            $table->string('delivery_date')->nullable();
            $table->integer('chefs_user_id')->unique()->unsigned();
            $table->timestamps();
            $table->foreign('chefs_user_id')->references('id')->on('users')->onDelete('cascade');
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
