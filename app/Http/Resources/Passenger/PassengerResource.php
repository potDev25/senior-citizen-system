<?php

namespace App\Http\Resources\Passenger;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PassengerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //verified date
        if($this->verified === 0){
            $date = Carbon::createFromFormat('m-d-Y', $this->verified);
            $verifiedDate = $date->format('F d, Y');
        }else{
            $verifiedDate = $this->verified;
        }

        return [
            'id' => $this->id,
            'name' => $this->last_name.' '.$this->first_name,
            'last_name' => $this->last_name,
            'first_name' => $this->first_name,
            'email' => $this->email,
            'age' => $this->age,
            'contact_number' => $this->contact_number,
            'middle_initial' => $this->middle_initial,
            'gender' => $this->gender,
            'birthdate' => $this->birthdate,
            'status' => $this->status,
            'religion' => $this->religion,
            'type' => $this->type,
            'verified' => $verifiedDate,
            'password' => $this->password,
            'qrcode_hash' => $this->qrcode_hash,
            'province' => $this->province,
            'barangay' => $this->barangay,
            'city' => $this->city,
            'created_at' => Carbon::parse($this->created_at)->format('F d, Y'),
            'updated_at' => $this->updated_at,
            'address' => $this->address,
            'citizenship' => $this->citizenship,

            'back_id' => asset('./storage/'.$this->media->back_id),
            'front_id' => asset('./storage/'.$this->media->front_id),
            'selfie' => asset('./storage/'.$this->media->selfie),
            'study_load' => asset('./storage/'.$this->media->study_load),
            'psa' => asset('./storage/'.$this->media->psa)
        ];
    }
}
