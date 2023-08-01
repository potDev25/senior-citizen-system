<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdNumber extends Model
{
    use HasFactory;

    public function passenger(){
        return $this->belongsTo(Passenger::class);
    }
}
