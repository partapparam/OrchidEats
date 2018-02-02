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
            $table->text('review');
            $table->integer('ratings_chef_id')->unsigned();
            $table->integer('ratings_user_id')->unsigned();
            // make sure to make the two above gaurded in the ratings model!!
            $table->timestamps();
            $table->foreign('ratings_user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ratings_chef_id')->references('chef_id')->on('chefs');
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
