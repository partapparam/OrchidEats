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
            $table->integer('min_per_order')->nullable()->default(0);
            $table->string('order_deadline')->nullable();
            $table->boolean('pickup')->default(0)->nullable();
            $table->boolean('delivery')->default(1)->nullable();
            $table->string('delivery_date')->nullable();
            $table->text('delivery_info')->nullable();
            $table->string('delivery_fee')->nullable();
            $table->string('pickup_date')->nullable();
            $table->text('pickup_info')->nullable();
            $table->string('pickup_pickup')->nullable();
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
