<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->increments('delivery_id')->unsigned();
            $table->boolean('completed')->default(0);
            $table->string('driver')->nullable();
            $table->integer('deliveries_order_id')->unsigned()->nullable();
            $table->timestamps();
            $table->foreign('deliveries_order_id')->references('order_id')->on('orders')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
}
