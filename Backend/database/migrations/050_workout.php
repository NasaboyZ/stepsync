<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up()
  {
    Schema::create('workouts', function (Blueprint $table) {
      $table->id();
      $table->string('category', 100);
      $table->string('title', 255);
      $table->text('description');
      $table->unsignedInteger('weight')->nullable();
      $table->unsignedInteger('repetitions')->nullable();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('workouts');
  }
};
