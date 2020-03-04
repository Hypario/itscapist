<?php

namespace App\Modeles;

use Illuminate\Database\Eloquent\Model;

class Tache extends Model {
    function suivis() {
        return $this->hasMany(Suivi::class);
    }

    function personnes() {
        return $this->belongsToMany(Personne::class);
    }
}
