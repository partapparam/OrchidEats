<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnBundleRules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chefs', function (Blueprint $table) {
            $table->string('bundle2')->nullable()->after('order_rule');
            $table->string('bundle3')->nullable()->after('bundle2');
            $table->string('bundle4')->nullable()->after('bundle3');
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
            $table->dropColumn('bundle2');
            $table->dropColumn('bundle3');
            $table->dropColumn('bundle4');
        });
    }
}
