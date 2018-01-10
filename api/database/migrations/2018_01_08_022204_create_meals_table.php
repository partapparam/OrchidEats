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
            $table->increments('id');
            $table->integer('rating');
            $table->string('name');
            $table->string('type');
            $table->string('calories');
            $table->string('protein');
            $table->string('carbs');
            $table->string('fat');
            $table->text('description');
            $table->string('price');
            $table->string('photo');
            $table->integer('chef_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('meals', function ($table) {
            $table->foreign('chef_id')->references('id')->on('chefs')->onDelete('cascade');
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
