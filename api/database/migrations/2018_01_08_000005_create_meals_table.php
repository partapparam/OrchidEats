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
            $table->string('name')->nullable();
            $table->string('type')->nullable();
            $table->text('description')->nullable();
            $table->tinyInteger('price')->nullable();
            $table->integer('meals_chef_id')->unsigned()->nullable();
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
