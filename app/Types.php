<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Types extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id','name'];
}
