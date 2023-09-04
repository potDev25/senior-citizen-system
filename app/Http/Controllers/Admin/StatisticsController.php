<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManifestData;
use App\Models\ManifestDate;
use App\Models\Ticket;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $date = '2023-08';
        $routes = ManifestDate::where('date', 'like', '%' . $date . '%')->groupBy('route')->get();
        $routeStatsResult = [];
        $routeMonthlySalse = [];

        foreach ($routes as $route) {
            $manifestData = ManifestData::where('month_year', '2023-Aug')
                                        ->where('route', $route->route)
                                        ->get();
            $routeStatsResult[] = [
                'route' => $route->route,
                'passengers' => count($manifestData)
            ];
        }

        foreach ($routes as $route) {
            $tickets = Ticket::where('month_year', '2023-Aug')
                            ->where('route', $route->route)
                            ->sum('fair');
            $routeMonthlySalse[] = [
                'route' => $route->route,
                'sales' => $tickets
            ];
        }

        return response(compact('routes', 'routeStatsResult', 'routeMonthlySalse'));
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
