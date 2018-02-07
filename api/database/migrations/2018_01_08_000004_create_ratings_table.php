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
            $table->integer('rating');
            $table->text('body')->nullable();
            $table->text('chef_feedback');
            $table->integer('ratings_chef_id')->unsigned();
            $table->integer('ratings_user_id')->unsigned();
            $table->integer('ratings_order_id')->unsigned();
            $table->timestamps();
            $table->foreign('ratings_user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ratings_chef_id')->references('chef_id')->on('chefs');
            $table->foreign('ratings_order_id')->references('order_id')->on('orders');
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
