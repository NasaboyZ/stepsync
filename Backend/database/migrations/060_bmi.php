<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('b_m_i_s', function (Blueprint $table) {
            $table->id();  // Primärschlüssel
            $table->float('height')->nullable();  // Größe in cm
            $table->float('weight')->nullable();  // Gewicht in kg
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // Verknüpfung mit der Users-Tabelle
            $table->timestamps();  // Zeitstempel
        });
    }

    public function down()
    {
        Schema::dropIfExists('b_m_i_s');
    }
};
