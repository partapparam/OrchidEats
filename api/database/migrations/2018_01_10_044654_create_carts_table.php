<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->increments('cart_id');
            $table->integer('carts_user_id')->unsigned()->nullable();
            $table->integer('carts_chef_id')->unsigned()->nullable();
            $table->string('chefs_order_deadline')->nullable();
            $table->text('details')->nullable();
            $table->boolean('expired')->default(0)->nullable();
            $table->timestamps();
            $table->foreign('carts_user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('carts_chef_id')->references('chef_id')->on('chefs')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carts');
    }
}
