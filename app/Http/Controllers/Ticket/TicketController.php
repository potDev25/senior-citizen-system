<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\WithMinorRequest;
use App\Models\Fair;
use App\Models\ManifestAction;
use App\Models\ManifestData;
use App\Models\ManifestDate;
use App\Models\Passenger;
use App\Models\RefundRebook;
use App\Models\SetsModel;
use App\Models\Ticket;
use App\Models\TicketSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ManifestData $manifestData, Passenger $passenger, ManifestDate $manifestDate)
    {
        $id_number = $passenger->id_number()->first();
        if($manifestDate->status === 0){
            $newTicket = Ticket::latest()->first();

            if(isset($newTicket->sequence)){
                $newSequence = str_pad($newTicket->sequence + 1, 5, '0', STR_PAD_LEFT);
            }else{
                $newSequence = str_pad(1, 5, '0', STR_PAD_LEFT);
            }
        }else{
            $newTicket = Ticket::where('manifest_date_id', $manifestDate->id)
                        ->where('passenger_id', $passenger->id)
                        ->first();
            $newSequence = str_pad($newTicket->sequence, 5, '0', STR_PAD_LEFT);
        }
       
        $ticket_settings = TicketSetting::first();
        $fare = Fair::first();
        return response(compact('passenger', 'manifestData', 'manifestDate', 'id_number', 'ticket_settings', 'fare', 'newSequence'));
    }

    /**
     * Store a newly created resource in storage.
     */

    public function setFair(int $manifest_id){
        $manifest = ManifestData::where('id', $manifest_id)->first();
        $fare = Fair::first();

        $fair = $manifest->type === 'Student' && $fare->student;
        $fair = $manifest->type === 'Regular' && $fare->regular;
        $fair = $manifest->type === 'Senior' && $fare->senior;
        $fair = $manifest->type === 'PWD' && $fare->pwd;

        return $fair;
    }

    public function store(ManifestData $manifest, Request $request)
    {
        $fare = Fair::first();
        $newTicket = Ticket::latest()->first();
        $getRoute = ManifestDate::where('id', $request->manifest_date_id)->first();

        if(isset($newTicket->sequence)){
            $newSequence = $newTicket->sequence + 1;
        }else{
            $newSequence = 1;
        }


        if($manifest->type === 'Student'){
            $fair = $fare->student;
        }
        if($manifest->type === 'Regular'){
            $fair = $fare->regular;
        }
        if($manifest->type === 'Senior'){
            $fair = $fare->senior;
        }
        if($manifest->type === 'PWD'){
            $fair = $fare->pwd;
        }
        if($manifest->type === 'Minor'){
            $fair = $fare->minor;
        }

        $ticket                      = new Ticket();
        $ticket->manifest_date_id    = $request->manifest_date_id;
        $ticket->passenger_id        = $request->passenger_id;
        $ticket->manifest_data_id    = $request->manifest_data_id;
        $ticket->fair                = $fair;
        $ticket->type                = $manifest->type;
        $ticket->sequence            = str_pad($newSequence, 5, '0', STR_PAD_LEFT);
        $ticket->route               = $getRoute->route;
        $ticket->month_year          = Carbon::now()->format('Y-M');
        $ticket->save();

        return response(200);
    }

    public function withMinor(Passenger $passenger, ManifestDate $manifestDateId, WithMinorRequest $request){
        $data                          = $request->validated();

        $passengerManifest             = ManifestData::where('passengers_id', $passenger->id)
                                        ->where('manifest_dates_id', $manifestDateId->id)
                                        ->first();
        $passengerManifest->with_minor = $data['name'];
        $passengerManifest->update();

        return response(200);
    }

    public function rebook(Passenger $passenger, ManifestDate $manifestDateId, Request $request){
        $request->validate([
            'date' => 'required'
        ]);

        $passengerManifest             = ManifestData::where('passengers_id', $passenger->id)
                                        ->where('manifest_dates_id', $manifestDateId->id)
                                        ->first();
        $passengerManifest->status = 'rebooked';
        $passengerManifest->update();

        $rebook_refund                    = new RefundRebook();
        $rebook_refund->passenger_id      = $passenger->id;
        $rebook_refund->manifest_dates_id = $manifestDateId->id;
        $rebook_refund->date              = $request->date;
        $rebook_refund->save();

        return response(200);
    }

    public function refund(Passenger $passenger, ManifestDate $manifestDateId){

        $passengerManifest                = ManifestData::where('passengers_id', $passenger->id)
                                            ->where('manifest_dates_id', $manifestDateId->id)
                                            ->first();
        $passengerManifest->status        = 'refunded';
        $passengerManifest->update();

        $rebook_refund                    = new RefundRebook();
        $rebook_refund->passenger_id      = $passenger->id;
        $rebook_refund->manifest_dates_id = $manifestDateId->id;
        $rebook_refund->save();

        return response(200);
    }

    public function removeMinor(Passenger $passenger, ManifestDate $manifestDateId){
    
        $passengerManifest                 = ManifestData::where('passengers_id', $passenger->id)
                                            ->where('manifest_dates_id', $manifestDateId->id)
                                            ->first();
        $passengerManifest->with_minor     = null;
        $passengerManifest->update();

        return response(200);
    }

    public function submit(){
        $action = ManifestAction::first();
        $action->action = "false";
        $action->save();

        $dates = ManifestDate::where('status', 0)->first();
        $dates->status = 1;
        $dates->update();

        SetsModel::where('status', 1)->update([
            'status' => 0
        ]);

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
