<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        $setUpDate         = Carbon::createFromFormat('Y-M', $month);
        $year = '2023';
        $date              = $setUpDate->format('Y-m');
        $routes            = ManifestDate::where('date', 'like', '%' . $date . '%')->groupBy('route')->get();
        $passengers        = ManifestData::groupBy('type')->get();
        $getMonth          = ManifestData::groupBy('month_year')
                                         ->get();
        $getTickets           = Ticket::where('month_year',  'like', '%' . $year . '%')
                                        ->groupBy('month_year')
                                        ->get();
        $routeStatsResult  = [];
        $routeMonthlySalse = [];
        $passStats         = [];
        $options           = [];
        $annualSales       = []; 

        foreach ($getMonth as $m) {
            $options[] = [
                'label'         => $m->month_year,
                'value'         => $m->month_year,
            ];
        }

        foreach ($routes as $route) {
            $manifestData = ManifestData::where('month_year', $month)
                                        ->where('route', $route->route)
                                        ->get();
            $routeStatsResult[] = [
                'route' => $route->route,
                'passengers' => count($manifestData)
            ];
        }

        foreach ($routes as $route) {
            $tickets = Ticket::where('month_year', $month)
                            ->where('route', $route->route)
                            ->sum('fair');
            $routeMonthlySalse[] = [
                'route' => $route->route,
                'sales' => $tickets
            ];
        }

        foreach ($passengers as $passenger) {
            $pass = ManifestData::where('month_year', $month)
                    ->where('type', $passenger->type)
                    ->get();
            $passStats[] = [
                'type' => $passenger->type,
                'numberPassenger' => count($pass)
            ];
        }

        foreach ($getTickets as $ticket) {
            $fare = Ticket::where('month_year', $ticket->month_year)
                            ->sum('fair');
            $annualSales[] = [
                'month' => $ticket->month_year,
                'sales' => $fare
            ];
        }

        return response(compact('routes', 'routeStatsResult', 'routeMonthlySalse', 'passStats', 'options', 'date', 'month', 'annualSales'));
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
