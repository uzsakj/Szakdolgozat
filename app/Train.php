<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Train extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id','wagon_ids','pos_x','pos_y'];
}
