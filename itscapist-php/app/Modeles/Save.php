<?php

namespace App\Modeles;

use Illuminate\Database\Eloquent\Model;

class Save extends Model
{

    protected $table = 'save';

    protected $fillable = ['map_id', 'inventory', 'health'];

    public $timestamps = false;

}
