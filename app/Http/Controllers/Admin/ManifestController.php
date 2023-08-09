<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ManifestDataRequest;
use App\Http\Requests\Admin\ManifestRequest;
use App\Models\ManifestAction;
use App\Models\ManifestData;
use App\Models\ManifestDate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManifestController extends Controller
{
    public function store(ManifestRequest $request){
        $data = $request->validated();
        $time = explode('/', $data['route']);

        $save_manifest = new ManifestDate();
        $save_manifest->date = $data['date'];
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

    public function store_manifest_data(ManifestDataRequest $request){
        $data = $request->validated();
        $validate = ManifestData::where('passengers_id', $data['passengers_id'])
                    // ->where('manifest_dates_id', $data['manifest_dates_id'])
                    ->first();

     
        $save = ManifestData::create($data);
        $id = $save->id;
        if(!$save){
            return response(422);
        }

        $status = 200;

        return response(compact('status', 'id'));
        
    }

    public function passengers(string $date_id){
        $get_date_id = ManifestDate::where('status', 0)->first();
        $data = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->where('manifest_data.manifest_dates_id', $get_date_id->id)
                    ->where('manifest_data.status','complete')
                    ->get();

        return json_encode($data);
    }
}
