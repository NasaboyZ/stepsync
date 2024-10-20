<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    function up()
    {
        // Create challenges table
        Schema::create('challenges', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('goal');
            $table->boolean('status');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();   
            $table->timestamps();
        });

        // Create challenge_user pivot table with an additional status column
        Schema::create('challenge_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('challenge_id')->constrained()->onDelete('cascade');
            $table->integer('status')->default(0); 
            $table->timestamps();
        });
    }

    function down()
    {
        // Drop the pivot table and challenges table
        Schema::dropIfExists('challenge_user');
        Schema::dropIfExists('challenges');
    }
};
