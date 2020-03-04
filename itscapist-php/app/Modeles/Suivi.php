<?php

namespace App\Modeles;

use App\Models\Tache;
use Illuminate\Database\Eloquent\Model;

class Suivi extends Model
{
    function tache() {
        return $this->belongsTo(Tache::class);
    }
    function personne() {
        return $this->belongsTo(Personne::class);
    }}
