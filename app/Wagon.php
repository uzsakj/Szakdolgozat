<?php

namespace App;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;

class Wagon extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'station_id',
        'train_id',
        'type_id',
        'capcity',
        'created_at',
        'updated_at',
    ];
}
