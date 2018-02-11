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
            $table->integer('diets_chef_id')->unsigned();
            $table->boolean('keto')->default(0)->nullable();
            $table->boolean('paleo')->default(0)->nullable();
            $table->boolean('high_fat')->default(0)->nullable();
            $table->boolean('low_carb')->defautl(0)->nullable();
            $table->boolean('high_protein')->default(0)->nullable();
            $table->boolean('vegan')->default(0)->nullable();
            $table->boolean('vegetarian')->default(0)->nullable();
            $table->timestamps();
            $table->foreign('diets_chef_id')->references('chef_id')->on('chefs')->onUpdate('cascade')->onDelete('cascade');
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
