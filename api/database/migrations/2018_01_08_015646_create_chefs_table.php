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
            $table->increments('id')->unsigned();
            $table->string('food_handler')->unique();
            $table->string('min_order');
            $table->string('order_limit');
            $table->tinyInteger('pickup')->default(0);
            $table->tinyInteger('oe_delivery')->default(1);
            $table->tinyInteger('per_delivery')->default(0);
            $table->integer('user_id')->unique()->unsigned();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
