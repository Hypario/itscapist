<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuiviTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('suivis', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('titre', 70)->nullable(false);
            $table->text('commentaire');
            $table->bigInteger('tache_id')->unsigned();
            $table->foreign('tache_id')->references('id')->on('taches');
            $table->bigInteger('personne_id')->unsigned();
            $table->foreign('personne_id')->references('id')->on('personnes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('Suivi');
    }
}
