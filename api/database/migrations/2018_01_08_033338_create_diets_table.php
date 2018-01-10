<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDietsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diets', function (Blueprint $table) {
            $table->integer('chef_id')->unsigned();
            $table->tinyInteger('keto');
            $table->tinyInteger('paleo');
            $table->tinyInteger('high_fat');
            $table->tinyInteger('low_carb');
            $table->tinyInteger('high_protein');
            $table->tinyInteger('vegan');
            $table->tinyInteger('vegetarian');
            $table->timestamps();
        });

        Schema::table('diets', function ($table) {
            $table->foreign('chef_id')->references('id')->on('chefs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('diets');
    }
}