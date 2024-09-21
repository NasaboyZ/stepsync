<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up()    {
    Schema::create('workouts', function (Blueprint $table) {
      $table->id(); 
      $table->string('category');  
      $table->text('description'); 
      $table->integer('weight')->nullable();  
      $table->integer('repetitions')->nullable();  
      $table->foreignId('user_id')->constrained()->onDelete('cascade')->nullable();
      $table->timestamps();  
  });
  }

  public function down() {
    Schema::dropIfExists('workouts');
  }
};
