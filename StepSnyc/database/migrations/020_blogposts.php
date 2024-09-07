<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up() {
    Schema::create('blogposts', function (Blueprint $table) {
        $table->id(); // Primärschlüssel
        $table->string('title'); // Titel des Blogposts
        $table->text('content'); // Inhalt des Blogposts
        $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Fremdschlüssel zu User
        $table->timestamps(); // Zeitstempel (created_at, updated_at)
    });
}

  function down() {
    Schema::dropIfExists('blogpost');
  }
};
