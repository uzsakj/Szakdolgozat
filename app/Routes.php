<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Routes extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'section_ids',
        'starting_station_id',
        'ending_station_id'
    ];
}
