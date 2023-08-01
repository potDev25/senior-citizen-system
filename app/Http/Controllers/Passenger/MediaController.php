<?php

namespace App\Http\Controllers\Passenger;

use App\Http\Controllers\Controller;
use App\Http\Requests\MediaRequest;
use App\Http\Resources\Passenger\MediaResource;
use App\Models\IdNumber;
use App\Models\Media;
use App\Models\Passenger;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function store(MediaRequest $request, Passenger $passenger){
        $data = $request->validated();

        if($request->hasFile('front_id')){
            $data['front_id'] = $request->file('front_id')->store('media', 'public');
        }

        if($request->hasFile('back_id')){
            $data['back_id'] = $request->file('back_id')->store('media', 'public');
        }

        if($request->hasFile('study_load')){
            $data['study_load'] = $request->file('study_load')->store('media', 'public');
        }

        if($request->hasFile('selfie')){
            $data['selfie'] = $request->file('selfie')->store('media', 'public');
        }

        $save_media = Media::create([
            'front_id'       => $data['front_id'],
            'back_id'        => $data['back_id'],
            'passengers_id'  => $data['passengers_id'],
            'study_load'     => $data['study_load'],
            'selfie'         => $data['selfie'],
        ]);

        IdNumber::create([
            'id_number'      => $data['id_number'],
            'passenger_id'   => $data['passengers_id'],
        ]);

        if($save_media){
            $passenger->done = 1;
            $passenger->save();

            $status = 200;
            $id = $save_media->id;
        }

        return response(compact('status', 'id'));
    }

    public function show(Media $media){
        return new MediaResource($media);
    }

    public function get_media(Request $request){
        $data = Media::where('passengers_id', $request->passenger)->first();

        return new MediaResource($data);
    }
}
