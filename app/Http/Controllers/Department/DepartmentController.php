<?php

namespace App\Http\Controllers\Department;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\DepartmentRequest;
use App\Http\Resources\Passenger\PassengerResource;
use App\Models\Department;
use App\Models\Passenger;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     //get all barangays
    public function index(int $limit)
    {
        $barangays = Department::where('type', 'Barangay')
                                ->paginate($limit);

        return response(compact('barangays'));
    }

    public function getSeniors(Passenger $passenger, int $limit, Request $request){
        return PassengerResource::collection(
            $passenger::where('verified', '!=', 0)
                        ->where('barangay', $request->barangay)
                        ->orderBy('id', 'DESC')
                        ->paginate($limit)
        );
    }

    public function getDepartmentStaff(int $limit, Department $department){
        $users = User::where('department_id', $department->id)->paginate($limit);

        return response(compact('department', 'users'));
    }

    //scanned seniors in barangay
    public function getScannedSeniors(Passenger $passenger, int $limit, Request $request){
        if(auth()->user()->role === 'admin'){
            $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.status','complete')
                    ->where('passengers.barangay', $request->barangay)
                    // ->groupBy('manifest_data.passengers_id')
                    ->paginate($limit);
        }elseif(auth()->user()->role === 'barangay'){
            $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.status','complete')
                    ->where('passengers.barangay', auth()->user()->barangay)
                    // ->groupBy('manifest_data.passengers_id')
                    ->paginate($limit);
        }

        return response(compact('data'));
    }

    //scanned seniors in departments
    public function getScannedSeniorsDepartment(Passenger $passenger, int $limit, Request $request){
        if(auth()->user()->role === 'admin'){
            $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.status','complete')
                    ->where('manifest_data.department_id', $request->barangay)
                    // ->where('passengers.barangay', $request->barangay)
                    // ->groupBy('manifest_data.passengers_id')
                    ->paginate($limit);
        }elseif(auth()->user()->role === 'department'){
            $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.status','complete')
                    ->where('manifest_data.user_id', auth()->user()->id)
                    // ->where('passengers.barangay', auth()->user()->barangay)
                    // ->groupBy('manifest_data.passengers_id')
                    ->paginate($limit);
        }

        return response(compact('data'));
    }

    //get all barangays
    public function departments(int $limit)
    {
        $barangays = Department::where('type', 'Department')
                                ->paginate($limit);

        return response(compact('barangays'));
    }


    /**
     * Store a newly created resource in storage.
     */

     //check if barangay is already exist
    public function checkBarangayExist(string $barangay) : bool{
       $check = Department::where('barangay', $barangay)->first();

       if($check){
        return true;
       }else{
        return false;
       }
    }

     //for storing barangays
    public function store(DepartmentRequest $request)
    {
        $data = $request->validated();

        if($this->checkBarangayExist($data['barangay'])){
            return response(422);
        }else{
            if($request->hasFile('photo')){
                $data['photo']     = $request->file('photo')->store('media', 'public');
            }

            $province              = DB::table('provinces')->where('province_id', $data['province'])->first();
            $city                  = DB::table('cities')->where('city_id', $data['city'])->first();

            $barangay = Department::create([
                'designation'      => $data['designation'],
                'province'         => $province->name,
                'city'             => $city->name,
                'barangay'         => $data['barangay'],
                'head'             => $data['head'],
                'contact_number'   => $data['contact_number'],
                'contact_email'    => $data['contact_email'],
                'type'             => 'Barangay',
                'logo'             => $data['photo'],
            ]);

            $id = $barangay->id;

            if($barangay){
                $response = 200;

            }else{
                $response = 500;
            }

            return response(compact('response', 'id'));
        }
    }

    //store department

    public function storeDepartment(DepartmentRequest $request)
    {
        $data = $request->validated();

        if($request->hasFile('photo')){
            $data['photo'] = $request->file('photo')->store('media', 'public');
        }

        $province              = DB::table('provinces')->where('province_id', $data['province'])->first();
        $city                  = DB::table('cities')->where('city_id', $data['city'])->first();

        $barangay = Department::create([
            'designation' => $data['designation'],
            'province'         => $province->name,
            'city'             => $city->name,
            'barangay'         => $data['barangay'],
            'head'             => $data['head'],
            'contact_number'   => $data['contact_number'],
            'contact_email'    => $data['contact_email'],
            'type'             => 'Department',
            'logo'             => $data['photo'],
        ]);

        $id = $barangay->id;

        if($barangay){
            $response = 200;

        }else{
            $response = 500;
        }

        return response(compact('response', 'id'));
    }

    //getNUmber of seniors in Barangay
    public function getNumbers(Department $barangay){
        $seniors    = Passenger::where('barangay', $barangay->barangay)
                    ->where('verified', '!=', 0)
                    ->where('done', 1)
                    ->get();

        $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.status','complete')
                    ->where('passengers.barangay', $barangay->barangay)
                    // ->groupBy('manifest_data.passengers_id')
                    ->get();
        
        $user       = User::where('designation', $barangay->id)->first(); 

        $numberData = [
            'seniors' => count($seniors),
            'scanned' => count($data)
        ];
        
        return response(compact('numberData', 'user'));
    }

    public function getStaffNumbers(Department $department){
        $staff    = User::where('department_id', $department->id)->get();

        $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.status','complete')
                    ->where('manifest_data.department_id', $department->id)
                    // ->groupBy('manifest_data.passengers_id')
                    ->get();
        
        // $user       = User::where('designation', $barangay->id)->first(); 

        $numberData = [
            'staff' => count( $staff ),
            'scanned' => count($data),
        ];
        
        return response(compact('numberData'));
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
    public function update(Department $user, Request $request)
    {
        if(isset($request->contact_number)){
            $request->validate([
                'contact_number' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|max:11|unique:departments,cotact_number,'.$user->id
            ]);
           }
    
           if(isset($request->contact_email)){
            $request->validate([
                'contact_email' => 'required|email|unique:departments,email,'.$user->id
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

           $province              = DB::table('provinces')->where('province_id', $request->province)->first();
           $city                  = DB::table('cities')->where('city_id', $request->city)->first();
    
           $user->designation = isset($request->designation) ? $request->designation : $user->designation;
           $user->head = isset($request->head) ? $request->head : $user->head;
           $user->contact_number = isset($request->contact_number) ? $request->contact_number : $user->contact_number;
           $user->contact_email = isset($request->contact_email) ? $request->contact_email : $user->contact_email;
           $user->province = isset($request->province) ? $province->name : $user->province;
           $user->city = isset($request->city) ? $city->name : $user->city;
           $user->barangay = isset($request->barangay) ? $request->barangay : $user->barangay;
           $user->logo = isset($request->photo) ? $file : $user->logo;
           $user->update();
    
           return response(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $barangay){
        $barangay->delete();

        return response(200);
    }
}
