<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    Schema::create('articles', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->text('content');
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->timestamps();
    });
  }

  function down() {
    Schema::dropIfExists('articles');
  }
};
