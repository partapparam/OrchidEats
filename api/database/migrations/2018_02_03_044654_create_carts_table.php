<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShoppingCartsTable extends Migration
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
            $table->integer('carts_user_id');
            $table->integer('carts_chef_id');
            $table->string('chefs_order_deadline');
            $table->text('details')->nullable();
            $table->boolean('expired')->default(0);
            $table->timestamps();
            $table->foreign('carts_user_id')->references('id')->on('users');
            $table->foreign('carts_chef_id')->references('chef_id')->on('chefs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopping_carts');
    }
}
