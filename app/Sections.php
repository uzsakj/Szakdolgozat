<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sections extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'points',
        'lon',
        'lat',
    ];
}
