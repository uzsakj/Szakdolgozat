<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id','ordered_products','ordered_quantities','deadline','starting_station_id','destination_station_id'];
}
