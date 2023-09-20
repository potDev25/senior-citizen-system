<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Passenger\PassengerRequest;
use App\Models\Media;
use App\Models\Passenger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManagePassenger extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PassengerRequest $request)
    {
        $data = $request->validated();

        $province = DB::table('provinces')->where('province_id', $data['province'])->first();
        $city     = DB::table('cities')->where('city_id', $data['city'])->first();

        $passenger = Passenger::create([
            'last_name'      => $data['last_name'],
            'first_name'     => $data['first_name'],
            'email'          => $data['contact_email'],
            'contact_number' => $data['contact_number'],
            'gender'         => $data['gender'],
            'age'            => $data['age'],
            'birthdate'      => $data['birthdate'],
            'type'           => $data['type'],
            'address'        => $data['barangay'].', '. $city->name.', '.$province->name,
            'province'       => $province->name,
            'city'           => $city->name,
            'barangay'       => $data['barangay'],
            'password'       => bcrypt($data['password']),
            'qrcode_hash'    => rand(100, 1000000),
        ]);

        $id = $passenger->id;

        if($passenger){
            $response = 200;

        }else{
            $response = 500;
        }

        return response(compact('response', 'id'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Passenger $passenger)
    {
        return response(compact('passenger'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Passenger $passenger)
    {
        $passenger->delete();

        return response(200);
    }
}
