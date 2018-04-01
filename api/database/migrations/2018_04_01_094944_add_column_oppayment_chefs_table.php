<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnOppaymentChefsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chefs', function (Blueprint $table) {
            $table->string('payment_options')->nullable()->after('order_deadline');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chefs', function (Blueprint $table) {
            $table->dropColumn('payment_options');
        });
    }
}
