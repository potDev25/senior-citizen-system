<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StaffDepartmentRequest;
use App\Http\Requests\Staff\StaffRequest;
use App\Models\Department;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use function GuzzleHttp\Promise\all;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $limit)
    {
        // $users = User::where('id', '!=', Auth::user()->id)
        //         ->orderBy('id', 'DESC')
        //         ->paginate($limit);

        $users = DB::table('users')
                ->select('users.*', 'departments.*', 'users.id as user_id', 'departments.id as department_id', 'departments.designation as dep_designation')
                ->where('users.id', '!=', Auth::user()->id)
                ->where('users.role', 'barangay')
                ->join('departments', 'users.designation', '=', 'departments.id')
                ->orderBy('users.id', 'DESC')
                ->paginate($limit);

        $barangays = Department::where('type', 'Barangay')
                     ->get();
        
        return response(compact('users', 'barangays'));
    }

    public function department(int $limit)
    {
        // $users = User::where('id', '!=', Auth::user()->id)
        //         ->orderBy('id', 'DESC')
        //         ->paginate($limit);

        $users = DB::table('users')
                ->select('users.*', 'departments.*', 'users.id as user_id', 'departments.id as department_id', 'departments.designation as dep_designation')
                ->where('users.id', '!=', Auth::user()->id)
                ->where('users.role', 'department')
                ->join('departments', 'users.designation', '=', 'departments.id')
                ->orderBy('users.id', 'DESC')
                ->paginate($limit);

        $barangays = Department::where('type', 'Department')
                     ->get();
        
        return response(compact('users', 'barangays'));
    }

    //check if user for barangay already exist
    public function checkDesignationExist(int $designation) : bool {
        $check = User::where('designation', $designation)->first();

        return $check ? true : false;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StaffRequest $request)
    {
        $data = $request->validated();

        if($this->checkDesignationExist($data['designation'])){
            return response(422);
        }else{
            $email_data = [
                'recipient' => $data['contact_email'],
                'fromEmail' => "scims@gmail.com",
                'fromName' => 'Senior Citizen Management System.',
                'subject' => ' Thank You for Registering! Your User Account and QR Code Download Link',
                'password' => $data['password'],
                'email' => $data['contact_email'],
                'name' => $data['last_name'].' '.$data['first_name'],
            ];
    
            $sent = Mail::send('mail.staff_message', $email_data, function($message) use ($email_data){
                $message->to($email_data['recipient'])
                        ->from($email_data['fromEmail'], $email_data['fromName'])
                        ->subject($email_data['subject']);
            });
    
            if($sent){
                
                if($request->hasFile('photo')){
                    $data['photo'] = $request->file('photo')->store('media', 'public');
                }

                $province = DB::table('provinces')->where('province_id', $data['province'])->first();
                $city     = DB::table('cities')->where('city_id', $data['city'])->first();
    
                User::create([
                    'last_name'      => $data['last_name'],
                    'first_name'     => $data['first_name'],
                    'email'          => $data['contact_email'],
                    'cotact_number'  => $data['contact_number'],
                    'gender'         => $data['gender'],
                    'photo'          => $data['photo'],
                    'province'       => $province->name,
                    'city'           => $city->name,
                    'barangay'       => $data['barangay'],
                    'role'           => $data['role'],
                    'designation'    => $data['designation'],
                    'password'       => bcrypt($data['password']),
                    'birthdate'      => $data['birthdate'],
                ]);
    
                return response(200);
            }else{
                return response(500);
            }
        }

    }

    public function storeStaffDepartment(StaffDepartmentRequest $request, int $department)
    {
        $data = $request->validated();

        
        $email_data = [
            'recipient' => $data['contact_email'],
            'fromEmail' => "8rja_express@gmail.com",
            'fromName' => '8RJA EXPRESS INC.',
            'subject' => ' Thank You for Registering! Your User Account and QR Code Download Link',
            'password' => $data['password'],
            'email' => $data['contact_email'],
            'name' => $data['last_name'].' '.$data['first_name'],
        ];

        $sent = Mail::send('mail.staff_message', $email_data, function($message) use ($email_data){
            $message->to($email_data['recipient'])
                    ->from($email_data['fromEmail'], $email_data['fromName'])
                    ->subject($email_data['subject']);
        });

        if($sent){
            
            if($request->hasFile('photo')){
                $data['photo'] = $request->file('photo')->store('media', 'public');
            }

            User::create([
                'last_name'      => $data['last_name'],
                'first_name'     => $data['first_name'],
                'email'          => $data['contact_email'],
                'cotact_number'  => $data['contact_number'],
                'gender'         => $data['gender'],
                'photo'          => $data['photo'],
                'province'       => $data['province'],
                'city'           => $data['city'],
                'barangay'       => $data['barangay'],
                'role'           => $data['role'],
                'position'       => $data['position'],
                'department_id'  => $department,
                'password'       => bcrypt($data['password']),
                'birthdate'      => $data['birthdate'],
            ]);

            return response(200);
        }else{
            return response(500);
        }
    }

    public function check(User $user, Request $request){
        return response()->json(['valid' => Hash::check($request->password, $user->password)]);
    } 

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        if($user->role === 'admin'){
            $users = $user;
        }else{
            $users = DB::table('users')
                        ->select('users.*', 'departments.*', 'users.id as user_id', 'departments.id as department_id', 'departments.designation as dep_designation')
                        ->where('users.id', $user->id)
                        ->join('departments', 'users.designation', '=', 'departments.id')
                        ->first();
        }
                
        $getHistory = $user->history()->get();

        $loggedHistory = [];

        foreach($getHistory as $history){
            $loggedHistory[] = [
                'time' =>  Carbon::parse($history->created_at)->format('h:iA'),
                'date' =>  Carbon::parse($history->created_at)->format('M d, Y'),
                'email' => $user->email
            ];
        }


        return response(compact('users', 'loggedHistory'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, Request $request)
    {
       if(isset($request->contact_number)){
        $request->validate([
            'contact_number' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|max:11|unique:users,cotact_number,'.$user->id
        ]);
       }

       if(isset($request->contact_email)){
        $request->validate([
            'contact_email' => 'required|email|unique:users,email,'.$user->id
        ]);
       }
       if(isset($request->photo)){
            $request->validate([
                'photo' => 'required|image|mimes:png,jpg',
            ]);

            if($request->hasFile('photo')){
                $file = $request->file('photo')->store('media', 'public');
            }
       }

       $user->last_name = isset($request->last_name) ? $request->last_name : $user->last_name;
       $user->first_name = isset($request->first_name) ? $request->first_name : $user->first_name;
       $user->gender = isset($request->gender) ? $request->gender : $user->gender;
       $user->cotact_number = isset($request->contact_number) ? $request->contact_number : $user->cotact_number;
       $user->email = isset($request->contact_email) ? $request->contact_email : $user->email;
       $user->province = isset($request->province) ? $request->province : $user->province;
       $user->city = isset($request->city) ? $request->city : $user->city;
       $user->barangay = isset($request->barangay) ? $request->barangay : $user->barangay;
       $user->role = isset($request->role) ? $request->role : $user->role;
       $user->birthdate = isset($request->birthdate) ? $request->birthdate : $user->birthdate;
       $user->photo = isset($request->photo) ? $file : $user->photo;
       $user->designation = isset($request->designation) ? $request->designation : $user->designation;
       $user->position = isset($request->position) ? $request->position : $user->position;
       $user->update();

       return response(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response(200);
    }

    public function block(User $user)
    {
        if($user->block === 1){
            $user->block = 0;
        }elseif($user->block === 0){
            $user->block = 1;
        }

        $user->update();
        
        return response(200);
    }
}