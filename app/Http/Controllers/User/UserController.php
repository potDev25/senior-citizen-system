<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\LoginHistory;
use App\Models\SetsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Carbon\Carbon;

class UserController extends Controller
{
    public function login(LoginRequest $loginRequest){
        $credentials = $loginRequest->validated();
      
        if(!Auth::attempt($credentials)){
            return response([
                'message_error' => 'Invalid Credentials'
            ], 422);
        }

       /** @var User $user **/
        $user = Auth::user();

        //store login history
        $mytime = Carbon::now();
        LoginHistory::create([
            'description' => 'Logged in at '. $mytime->toDateTimeString(),
            'user_id'     => $user->id
        ]);

        //update status
        User::where('id', $user->id)->update(['status' => 1]);

        $user_token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'user_token'));
    }

    public function logout(Request $request){
        $user = $request->user();

        /** @var User $user **/
        User::where('id', auth()->user()->id)->update(['status' => 0]);
        $user->currentAccessToken()->delete();

        return response('', 204);
    }

    public function insert_set(Request $request){
        // $set = $request->set;
        // $type = $request->type;
        // $status = $request->status;
        $data = $request->all();
        for($i = 0; $i <= count($request->all()); $i++){
            SetsModel::create($data[$i]);
        }

        return response($data[0]);
    }
}
