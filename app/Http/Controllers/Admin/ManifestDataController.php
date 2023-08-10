<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManifestData;
use App\Models\ManifestDate;
use App\Models\Media;
use App\Models\Time;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManifestDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $routes        = Time::all();
        $latestDate    = ManifestDate::where('status', 1)
                            ->latest()
                            ->first();
        $getPassengers = ManifestData::all();

        $month      = date('M-d-Y', strtotime($latestDate->date)).' ' .$latestDate->time. ' | ' .$latestDate->route;

        $manifestDate  = [];
        $options       = [];
        $passengers    = [];
        $options[]     = [
            'label' => 'All',
            'value' => ''
        ];

        if(!isset($request->route)){
            $manifestDates = ManifestDate::where('status', 1)
                            ->orderBy('id', 'DESC')
                            ->get();
        }else{
            $manifestDates = ManifestDate::where('status', 1)
                            ->orderBy('id', 'DESC')
                            ->where('route', $request->route)
                            ->get();
        }

        foreach ($manifestDates as $manifest) {
            $manifestDate[] = [
                'id'            => $manifest->id,
                'date'          => date('M-d-Y', strtotime($manifest->date)),
                'route'         => $manifest->route,
                'time'          => $manifest->time,
                'passengers'    => count($manifest->manifestData()->get())
            ];
        }

        foreach ($routes as $route) {
            $options[] = [
                'label'         => $route->from.' - '.$route->to,
                'value'         => $route->from.' - '.$route->to,
            ];
        }

        foreach ($getPassengers as $pass) {
            $date              = ManifestDate::where('id', $pass->manifest_dates_id)->first();
            $passengers[] = [
                'passenger'    => $pass->passenger()->first(),
                'date'         => date('M-d-Y', strtotime($date->date)),
                'route'        => ManifestDate::where('id', $pass->manifest_dates_id)->first(),
                'type'         => $pass,
            ];
        }

        return response(compact('manifestDate', 'options', 'latestDate', 'month', 'passengers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ManifestDate $manifest)
    {
        $manifests = $manifest->manifestData()->get();
        $toPrint   = DB::table('manifest_data')
                    ->join('passengers', 'passengers.id', '=', 'manifest_data.passengers_id')
                    ->where('manifest_data.manifest_dates_id', $manifest->id)
                    ->get();

        $passengers = [];
        $number = [
            'refund'     => count($manifest->manifestData()->where('status', 'refunded')->get()),
            'with_minor' => count($manifest->manifestData()->where('with_minor','!=', null)->get()),
            'rebook'     => count($manifest->manifestData()->where('status', 'rebooked')->get()),
            'regulars'   => count($manifest->manifestData()->where('type', 'Regular')->get()),
            'student'    => count($manifest->manifestData()->where('type', 'Student')->get()),
            'minors'     => count($manifest->manifestData()->where('type', 'Minor')->get()),
            'senior'     => count($manifest->manifestData()->where('type', 'senior')->get()),
            'pwd'        => count($manifest->manifestData()->where('type', 'PWD')->get()),
        ];

        foreach ($manifests as $pass) {
            $passengers[] = [
                'passenger' => $pass->passenger()->first(),
                'media' => Media::where('passengers_id', $pass->passenger->id)->first(),
                'manifest'  => $pass
            ];
        }

        return response(compact('manifest', 'passengers', 'number', 'toPrint'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
