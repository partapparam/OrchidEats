<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->string('gender');
            $table->date('dob');
            $table->string('phone');
            $table->string('address');
            $table->string('zip');
            $table->text('bio');
            $table->string('prof_pic');
            $table->tinyInteger('email_note')->default(1);
            $table->tinyInteger('text_note')->default(1);
            $table->integer('profiles_user_id')->unsigned();
            $table->timestamps();
            $table->foreign('profiles_user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
