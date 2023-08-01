<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\ManifestData;
use App\Models\ManifestDate;
use App\Models\Passenger;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ManifestData $manifestData, Passenger $passenger, ManifestDate $manifestDate)
    {
        $id_number = $passenger->id_number()->first();
        return response(compact('passenger', 'manifestData', 'manifestDate', 'id_number'));
    }

    /**
     * Store a newly created resource in storage.
     */

    public function setFair(int $manifest_id){
        $manifest = ManifestData::where('id', $manifest_id)->first();

        $fair = $manifest->type == 'Student' && '250';
        $fair = $manifest->type == 'Regular' && '300';
        $fair = $manifest->type == 'Senior' && '250';
        $fair = $manifest->type == 'PWD' && '250';

        return $fair;
    }

    public function store(ManifestData $manifest, Request $request)
    {
        $ticket                      = new Ticket();
        $ticket->manifest_date_id    = $request->manifest_date_id;
        $ticket->passenger_id        = $request->passenger_id;
        $ticket->manifest_data_id    = $request->manifest_data_id;
        $ticket->fair                = $this->setFair($manifest->id);
        $ticket->type                = $manifest->type;
        $ticket->save();

        return response(200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
