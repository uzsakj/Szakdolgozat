<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'order_id',
        'train_id',
        'route_id',
        'time-span',
        'departure',
        'status',
        'creator_id',
    ];

}
