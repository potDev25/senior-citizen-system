<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Passenger;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        $departments = Department::where('type', 'Department')->get();
        $barangays = Department::where('type', 'Barangay')->get();
        $admins = User::where('role', 'barangay')->get();
        $_admins = User::where('role', 'department')->get();
        $departAdmins = User::where('role', 'department')->get();
        $seniors = Passenger::where('done', 1)->get();

        $numberData = [
            'departments' => count($departments),
            'barangays' => count($barangays),
            'seniors' => count($seniors),
            'admins' => count($admins) + count($_admins),
            'departAdmins' => count($departAdmins),
        ];

        return response(compact('numberData'));
    }
}
