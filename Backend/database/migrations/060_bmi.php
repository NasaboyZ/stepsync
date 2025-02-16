<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('b_m_i_s', function (Blueprint $table) {
            $table->id(); 
            $table->float('height')->nullable();  
            $table->float('weight')->nullable();  
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('b_m_i_s');
    }
};
