<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    Schema::create('tags', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->timestamps();
    });

    Schema::create('article_tag', function (Blueprint $table) {
      $table->id();
      $table->foreignId('article_id')->constrained()->cascadeOnDelete();
      $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
      $table->timestamps();
    });
  }

  function down() {
    Schema::dropIfExists('tags');
    Schema::dropIfExists('article_tag');
  }
};
