<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->increments('rating_id');
            $table->integer('rating')->nullable();
            $table->text('body')->nullable();
            $table->text('chef_feedback')->nullable();
            $table->integer('ratings_chef_id')->nullable()->unsigned()->nullable();
            $table->integer('ratings_user_id')->nullable()->unsigned()->nullable();
            $table->integer('ratings_order_id')->nullable()->unsigned()->nullable();
            $table->timestamps();
            $table->foreign('ratings_user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ratings_chef_id')->references('chef_id')->on('chefs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ratings_order_id')->references('order_id')->on('orders')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ratings');
    }
}
