<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('first_name');
      $table->string('last_name');
      $table->string('username')->unique();
      $table->string('email')->unique();
      $table->float('weight');
      $table->float('height');
      $table->string('password');
      $table->string('goal');
      $table->enum('gender', ['male', 'female', 'other']);
      $table->date('date_of_birth');
      $table->timestamps();
    });
  }

  function down()
  {
    Schema::dropIfExists('users');
  }
};
