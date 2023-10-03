<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ManifestDataRequest;
use App\Http\Requests\Admin\ManifestRequest;
use App\Models\ManifestAction;
use App\Models\ManifestData;
use App\Models\ManifestDate;
use App\Models\Passenger;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManifestController extends Controller
{
    public function store(ManifestRequest $request){
        $data = $request->validated();
        $time = explode('/', $data['route']);

        $save_manifest = new ManifestDate();
        $save_manifest->date = Carbon::now()->format('Y-m-d');
        $save_manifest->route = $time[0];
        $save_manifest->time = $time[1];
        $save = $save_manifest->save();

        if(!$save){
            return response([
                'message' => 'error'
            ], 422);
        }

        $action = [
            'action' => 'true'
        ];

        ManifestAction::where('id', 1)->update($action);
        $id = $save_manifest->id;
        $status = 200;

        return response(compact('id', 'status'));
    }

    public function store_manifest_data(Passenger $passenger){
        $save = ManifestData::create([
            'passengers_id'     => $passenger->id,
            'user_id'           => auth()->user()->id,
            'department_id'     => auth()->user()->designation,
            'month_year'        => Carbon::now()->format('Y-M'),
            'date'              => Carbon::now()->format('Y-m-d'),
        ]);
        $id = $save->id;
        if(!$save){
            return response(422);
        }

        $status = 200;

        return response(compact('status', 'id'));
    }

    public function passengers(){
        if(auth()->user()->role === 'admin'){
            $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.date', Carbon::now()->format('Y-m-d'))
                    ->where('manifest_data.status','complete')
                    ->groupBy('manifest_data.passengers_id')
                    ->get();
        }elseif(auth()->user()->role === 'barangay'){
            $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.date', Carbon::now()->format('Y-m-d'))
                    ->where('manifest_data.status','complete')
                    ->where('passengers.barangay', auth()->user()->barangay)
                    ->groupBy('manifest_data.passengers_id')
                    ->get();
        }elseif(auth()->user()->role === 'department'){
            $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->select('manifest_data.*', 'manifest_data.type as manifest_type', 'passengers.*')
                    ->where('manifest_data.date', Carbon::now()->format('Y-m-d'))
                    ->where('manifest_data.status','complete')
                    ->where('manifest_data.user_id', auth()->user()->id)
                    ->groupBy('manifest_data.passengers_id')
                    ->get();
        }

        return json_encode($data);
    }
}
