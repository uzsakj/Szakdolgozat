<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stations extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id','name','coordinate_x','coordinate_y'];
}
