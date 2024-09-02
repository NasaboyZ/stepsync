<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up() {
    Schema::create('workouts', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->enum('category', ['cardio', 'lifting']);
      $table->text('description');
      $table->integer('weight')->nullable();
      $table->integer('repetitions')->nullable();
      $table->timestamps();

      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
  }

  public function down() {
    Schema::dropIfExists('workouts');
  }
};
