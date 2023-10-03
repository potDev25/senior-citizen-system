<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\ManifestData;
use App\Models\ManifestDate;
use App\Models\Passenger;
use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $month)
    {
        $getDepartments = Department::where('type', 'Department')->get();
        $getBarangays   = Department::where('type', 'Barangay')->get();
        $scannedSeniors  = [];
        $barangaySeniors = [];

        foreach ($getDepartments as $m) {
            $getScannerSeniors = ManifestData::where('department_id', $m->id)->get();
            $scannedSeniors[] = [
                'department'         => $m->designation,
                'numberOfSeniors'    => count($getScannerSeniors),
            ];
        }

        //scanned seniors
        foreach ($getBarangays as $barangays) {
            $seniors = Passenger::where('barangay', $barangays->barangay)
                                        ->get();
            $barangaySeniors[] = [
                'barangay' => $barangays->designation,
                'numberOfSeniors' => count($seniors)
            ];
        }

        return response(compact('scannedSeniors', 'barangaySeniors', 'getDepartments', 'getBarangays'));
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
    public function show(string $id)
    {
        //
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
