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
            $table->string('calories')->nullable();
            $table->string('protein')->nullable();
            $table->string('carbs')->nullable();
            $table->string('fat')->nullable();
            $table->text('description')->nullable();
            $table->tinyInteger('price');
            $table->string('photo')->nullable();
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
