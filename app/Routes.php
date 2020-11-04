<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Routes extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'sections',
    ];
}
