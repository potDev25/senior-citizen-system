<?php

namespace App\Http\Controllers\Passenger;

use App\Http\Controllers\Controller;
use App\Http\Requests\PassengerRequest;
use App\Http\Resources\Passenger\PassengerNoMediaRerource;
use App\Http\Resources\Passenger\PassengerResource;
use App\Models\ManifestAction;
use App\Models\ManifestData;
use App\Models\ManifestDate;
use App\Models\Media;
use App\Models\Notification;
use App\Models\Passenger;
use App\Models\Time;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use PharIo\Manifest\Manifest;

class MangeController extends Controller
{
    public function insert(PassengerRequest $request){
        $data = $request->validated();

        $province              = DB::table('provinces')->where('province_id', $data['province'])->first();
        $city                  = DB::table('cities')->where('city_id', $data['city'])->first();

        $passenger = Passenger::create([
            'last_name'        => $data['last_name'],
            'first_name'       => $data['first_name'],
            'email'            => $data['email'],
            'contact_number'   => $data['contact_number'],
            'middle_initial'   => $data['middle_initial'],
            'gender'           => $data['gender'],
            'religion'         => $data['religion'],
            'citizenship'      => $data['citizenship'],
            'age'              => $data['age'],
            'birthdate'        => $data['birthdate'],
            'status'           => $data['status'],
            'type'             => 'Senior',
            'address'          => $data['barangay'] .','. $city->name .','. $province->name,
            'barangay'         => $data['barangay'],
            'city'             => $city->name,
            'province'         => $province->name,
            'qrcode_hash'      => rand(100, 1000000),
        ]);

        $id = $passenger->id;

        if($passenger){
            Notification::create([
                'notification' => $data['last_name'].' '.$data['first_name'].' '.'is requesting for approval',
                'passenger_id' => $id,
                'type' => 'seniors'
            ]);

            $response = 200;
        }else{
            $response = 500;
        }

        return response(compact('response', 'id'));
    }

    public function show(Passenger $passenger){
        Notification::where('passenger_id', $passenger->id)->update(['status' => 1]);
        return new PassengerResource($passenger);
    }
    
    public function get_passengers(Passenger $passenger){

        $get_media = Media::all();

        if(count($get_media) >= 0){
            $user = auth()->user()->role;
            if($user === 'admin'){
                $seniors = PassengerResource::collection(
                    $passenger::where('verified', 0)
                                ->where('done', 1)
                                ->orderBy('id', 'DESC')
                                ->get()

                );

                $numberberOfRequest = count($seniors);

                return response(compact('seniors', 'numberberOfRequest'));
            }elseif ($user === 'barangay') {
                
                $seniors = PassengerResource::collection(
                    $passenger::where('verified', 0)
                                ->where('barangay', auth()->user()->barangay)
                                ->where('done', 1)
                                ->orderBy('id', 'DESC')
                                ->get()
                );

                $numberberOfRequest = count($seniors);

                return response(compact('seniors', 'numberberOfRequest'));
            }
           
        }else{
           return response(null);
        }

    }

    public function get_passengers_approved(Passenger $passenger, int $limit){
        $user = auth()->user()->role;

        if($user === 'admin'){
            return PassengerResource::collection(
                $passenger::where('verified', '!=', 0)
                            ->orderBy('id', 'DESC')
                            ->paginate($limit)
            );
        }elseif($user === 'barangay'){
            return PassengerResource::collection(
                $passenger::where('verified', '!=', 0)
                            ->where('barangay', auth()->user()->barangay)
                            ->orderBy('id', 'DESC')
                            ->paginate($limit)
            );
        }
        
    }

    public function profile(Passenger $passenger, Request $request){

        if(isset($request->qr) || isset($request->date)){
            $data             = Passenger::where('qrcode_hash', $request->qr)->first();
            $check            = ManifestData::where('passengers_id', $data->id)
                                ->where('manifest_dates_id', $request->date)
                                ->first();

            if(isset($check)){
                return response([
                    'message-error' => 'error'
                ], 422);
            }else{

                $image = [
                    'back_id'     => asset('./storage/'.$data->media->back_id),
                    'front_id'    => asset('./storage/'.$data->media->front_id),
                    'selfie'      => asset('./storage/'.$data->media->selfie),
                    'study_load'  => asset('./storage/'.$data->media->study_load),
                    'psa'  => asset('./storage/'.$data->media->psa),
                ];
                return json_encode(compact('data', 'image'));
            }

            
        }elseif(isset($request->id)){

            $id = $request->id;
            $get_profile = Media::where('passengers_id', $id)->first();
    
            if($get_profile != null){
                return PassengerResource::collection(
                    $passenger::join('media', 'media.passengers_id', '=', 'passengers.id')
                    ->where('id', $request->id)
                    ->first()
                );
            }else{
                $data =  Passenger::where('id', $request->id)->first();
               return json_encode($data);
            }

        }
        
    }

    public function approve(Request $request){
        $id  = $request->id;
        $password = '';
        $link = '';
        
        if($id){
            $passenger = Passenger::where('id', $request->id)->first();

            if(!$passenger->verified){
                $passenger->verified = date('m-d-Y');
                
                if(!$passenger->password){
                    $try_pass = str_replace(' ', '_', $passenger->last_name);
                    $password = $try_pass.'_'.$passenger->age;
                    $passenger->password = bcrypt($password);
                }else{
                    $password = $request->password;
                    $passenger->password = bcrypt($password);
                }

                $link = 'http://localhost:5173/qr_code/'.$passenger->qrcode_hash;

                $email_data = [
                    'recipient' => $passenger->email,
                    'fromEmail' => "scims@gmail.com",
                    'fromName' => 'Senior Citizen Management System.',
                    'subject' => ' Thank You for Registering! Your User Account and QR Code Download Link',
                    'password' => $password,
                    'email' => $passenger->email,
                    'name' => $passenger->last_name.' '.$passenger->first_name,
                    'link' => $link,
                ];

                $sent = Mail::send('mail.index', $email_data, function($message) use ($email_data){
                    $message->to($email_data['recipient'])
                            ->from($email_data['fromEmail'], $email_data['fromName'])
                            ->subject($email_data['subject']);
                });

                if($sent){
                    $passenger->save();

                    return response([
                        'message' => 'success'
                    ], 200);
                }else{
                    return response([
                        'message-error' => 'error'
                    ], 422);
                }
                
            }
        }else{
            return response([
                'message-error' => 'error'
            ], 422);
        }
    }

    public function get_action(){
        $manifest         = ManifestAction::where('id', 1)->first();
        $action           = $manifest->action;
        $manifestDate     = ManifestDate::where('status', 0)->first();
        $routes           = Time::all();
        $passengers       = Passenger::where('verified', '!=', null)->get();
        $date             = $manifest->action === 'true' ? date('M-d-Y', strtotime($manifestDate->date)) : null;
        $rebookPassengers = DB::table('manifest_dates')
                            ->join('manifest_data', 'manifest_dates.id', '=', 'manifest_data.manifest_dates_id')
                            ->join('passengers', 'manifest_data.passengers_id', '=', 'passengers.id')
                            ->join('media', 'passengers.id', '=', 'media.passengers_id')
                            ->where('manifest_data.status', 'rebooked')
                            ->get();


        if(isset($manifestDate)){
            $number = [
                'refund'     => count($manifestDate->manifestData()
                                ->where('status', 'refunded')
                                ->where('status', '!=', 'rebooked')
                                ->get()),
                'with_minor' => count($manifestDate->manifestData()
                                ->where('with_minor','!=', null)
                                ->where('status', '!=', 'rebooked')
                                ->where('status', '!=', 'refunded')
                                ->get()),
                'rebook'     => count($manifestDate->manifestData()
                                ->where('status', 'rebooked')
                                ->where('status', '!=', 'refunded')
                                ->get()),
                'regulars'   => count($manifestDate->manifestData()
                                ->where('type', 'Regular')
                                ->where('status', '!=', 'rebooked')
                                ->where('status', '!=', 'refunded')
                                ->get()),
                'student'    => count($manifestDate->manifestData()
                                ->where('type', 'Student')
                                ->where('status', '!=', 'rebooked')
                                ->where('status', '!=', 'refunded')
                                ->get()),
                'minors'     => count($manifestDate->manifestData()->where('type', 'Minor')->get()),
                'senior'     => count($manifestDate->manifestData()
                                ->where('type', 'senior')
                                ->where('status', '!=', 'rebooked')
                                ->where('status', '!=', 'refunded')
                                ->get()
                            ),
                'pwd'        => count($manifestDate->manifestData()
                                ->where('type', 'PWD')
                                ->where('status', '!=', 'rebooked')
                                ->where('status', '!=', 'refunded')
                                ->get()),
            ];
        }else{
            $number = [
                'refund'     => 0,
                'with_minor' => 0,
                'rebook'     => 0,
                'regulars'   => 0,
                'student'    => 0,
                'minors'     => 0,
                'senior'     => 0,
                'pwd'        => 0,
            ];
        }

        return response(compact('action', 'manifestDate', 'routes', 'passengers', 'date', 'number', 'rebookPassengers'));
    }
}
