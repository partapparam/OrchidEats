<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMealsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meals', function (Blueprint $table) {
            $table->increments('meal_id');
            $table->boolean('current_menu')->nullable()->default(0);
            $table->string('name');
            $table->string('type');
            $table->text('description')->nullable();
            $table->tinyInteger('price');
            $table->string('photo')->nullable()->default('https://s3-us-west-1.amazonaws.com/meal.orchideats.com/default-meal.png');
            $table->integer('meals_chef_id')->unsigned();
            $table->timestamps();
            $table->foreign('meals_chef_id')->references('chef_id')->on('chefs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meals');
    }
}
