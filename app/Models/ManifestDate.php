<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManifestDate extends Model
{
    use HasFactory;

    public function manifestData(){
        return $this->hasMany(ManifestData::class, 'manifest_dates_id');
    }
}
