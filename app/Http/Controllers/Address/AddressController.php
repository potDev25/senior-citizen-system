<?php

namespace App\Http\Controllers\Address;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    public function provinces(){
        $provinces = DB::table('provinces')->get();

        return response(compact('provinces'));
    }

    public function cities(int $province_id){
        $cities = DB::table('cities')
                    ->where('province_id', $province_id)
                    ->get();

        return response(compact('cities'));
    }

    public function barangays(int $city_id){
        $barangays = DB::table('barangays')
                    ->where('city_id', $city_id)
                    ->get();

        return response(compact('barangays'));
    }
}
