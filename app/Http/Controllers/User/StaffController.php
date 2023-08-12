<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\StaffRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use function GuzzleHttp\Promise\all;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $limit)
    {
        $users = User::where('id', '!=', Auth::user()->id)
                ->orderBy('id', 'DESC')
                ->paginate($limit);
        
        return response(compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StaffRequest $request)
    {
        $data = $request->validated();

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
            'password'       => bcrypt($data['password']),
            'birthdate'      => $data['birthdate'],
        ]);

        return response(200);
    }

    public function check(User $user, Request $request){
        return response()->json(['valid' => Hash::check($request->password, $user->password)]);
    } 

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response(compact('user'));
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
}
