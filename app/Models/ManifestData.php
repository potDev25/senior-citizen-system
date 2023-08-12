<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ManifestData extends Model
{
    use HasFactory;
    public function passenger(){
        return $this->belongsTo(Passenger::class, 'passengers_id');
    }

    public function manifestDate(){
        return $this->belongsTo(ManifestDate::class);
    }

    public function ticket(){
        return $this->hasMany(Ticket::class, 'manifest_data_id');
    }
}
