<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Fair\FairRequest;
use App\Http\Requests\Settings\TimeRequest;
use App\Models\Fair;
use App\Models\TicketSetting;
use App\Models\Time;
use Illuminate\Http\Request;
use Nette\Utils\Arrays;

class SettingsController extends Controller
{
    public function index() {
        $fair                  = Fair::first();
        $time                  = Time::all();
        $tickeSettings         = TicketSetting::first();

        return response(compact('fair', 'time', 'tickeSettings'));
    }

    public function fair_store(FairRequest $request){
        $data                  = $request->validated();

        $fair                  = Fair::first();

        if(!isset($fair)){
            $setFair           = new Fair();

            $setFair->regular  = $data['regular'];
            $setFair->student  = $data['student'];
            $setFair->minor    = $data['minor'];
            $setFair->senior   = $data['senior'];
            $setFair->pwd      = $data['pwd'];
            $setFair->save();
        }else{
            $setFair           = Fair::first();

            $regular           = explode('.', $data['regular']); 
            $student           = explode('.', $data['student']); 
            $minor             = explode('.', $data['minor']); 
            $senior            = explode('.', $data['senior']); 
            $pwd               = explode('.', $data['pwd']); 

            $setFair->regular  = $regular[0];
            $setFair->student  = $student[0];
            $setFair->minor    = $minor[0];
            $setFair->senior   = $senior[0];
            $setFair->pwd      = $pwd[0];
            $setFair->update();
        }

        return response(200);
    }

    public function time_store(TimeRequest $request){
        $data               = $request->validated();

        $departureTime = $data['departure'];
        $departure = date("h:i A", strtotime($departureTime));

        $boardingTime = $data['boarding'];
        $boarding = date("h:i A", strtotime($boardingTime));

        $setTime            = new Time();

        $setTime->departure = $departure;
        $setTime->boarding  = $boarding;
        $setTime->to        = $data['to'];
        $setTime->from      = $data['from'];
        $setTime->save();
      
        return response(200);
    }

    public function time_update(Time $route,Request $request){

        if($request->departure != 'undefined'){
            $departureTime = $request->departure;
            $departure = date("h:i A", strtotime($departureTime));
        }

        if($request->boarding != 'undefined'){
            $boardingTime = $request->boarding;
            $boarding = date("h:i A", strtotime($boardingTime));
        }

        $route->departure = $request->departure === 'undefined' ? $route->departure : $departure;
        $route->boarding  = $request->boarding  === 'undefined' ? $route->boarding : $boarding;
        $route->to        = $request->to        === 'undefined' ? $route->to : $request->to;
        $route->from      = $request->from      === 'undefined' ? $route->from : $request->from;
        $route->update();
      
        return response(200);
    }

    public function show_time(Time $route){
        return response(compact('route'));
    }

    public function ticket_store(Request $request){

        $request->validate([
            'office_address'   => 'required',
            'original_address' => 'required',
            'type'             => 'required',
            'tin_no'           => 'required',
            'mobile'           => 'required',
            'telephone'        => 'required',
        ]);

        $check                 = TicketSetting::first();

        if(!isset($check)){
            $ticket_settings = new TicketSetting();

            $ticket_settings->office_address      = $request->office_address;
            $ticket_settings->original_address    = $request->original_address;
            $ticket_settings->type                = $request->type;
            $ticket_settings->tin_no              = $request->tin_no;
            $ticket_settings->mobile              = $request->mobile;
            $ticket_settings->telephone           = $request->telephone;
            $ticket_settings->save();
        }else{
            $check->office_address                = $request->office_address;
            $check->original_address              = $request->original_address;
            $check->type                          = $request->type;
            $check->tin_no                        = $request->tin_no;
            $check->mobile                        = $request->mobile;
            $check->telephone                     = $request->telephone;
            $check->update();
        }

      
       
        return response(200);
    }
}
