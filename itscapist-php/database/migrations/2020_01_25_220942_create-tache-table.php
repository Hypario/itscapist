<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTacheTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('taches', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('expiration')->nullable(false);
            $table->string('categorie')->default('A Faire')->nullable(false);
            $table->enum('accomplie', ['O', 'N'])->default('N')->nullable(false);
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('Tache');
    }
}
