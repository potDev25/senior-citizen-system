<?php

use App\Http\Controllers\Address\AddressController;
use App\Http\Controllers\Admin\ManagePassenger;
use App\Http\Controllers\Admin\ManifestController;
use App\Http\Controllers\Admin\ManifestDataController;
use App\Http\Controllers\Admin\StatisticsController;
use App\Http\Controllers\Announcment\AnnouncementController;
use App\Http\Controllers\Chair\ChairController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Department\DepartmentController;
use App\Http\Controllers\Notification\NotificationController;
use App\Http\Controllers\Passenger\MangeController;
use App\Http\Controllers\Passenger\MediaController;
use App\Http\Controllers\Settings\SettingsController;
use App\Http\Controllers\Ticket\TicketController;
use App\Http\Controllers\User\StaffController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::controller(DashboardController::class)->group(function () {
        Route::get('/dashboard', 'index');
    });

    Route::get('/get-passengers', [MangeController::class, 'get_passengers']);

    Route::get('/manifest-action', [MangeController::class, 'get_action']);

    Route::get('/get-passengers-approved/{limit}', [MangeController::class, 'get_passengers_approved']);

    Route::put('/approve-registration', [MangeController::class, 'approve']);

    Route::post('/store-manifest', [ManifestController::class, 'store']);

    Route::post('/store-manifest-data/{passenger}', [ManifestController::class, 'store_manifest_data']);

    Route::post('/admin-logout', [UserController::class, 'logout']);

    Route::post('/insert-set', [UserController::class, 'insert_set']);

    Route::get('/get-sets/{manifest}', [ChairController::class, 'get_sets']);

    Route::get('/get-passenger-manifest', [ManifestController::class, 'passengers']);

    Route::put('/assign-set', [ChairController::class, 'assign_set']);

    Route::get('/get-ticket-info/{manifestData}/{passenger}/{manifestDate}', [TicketController::class, 'index']);
    Route::post('/ticket/store/{manifest}', [TicketController::class, 'store']);
    Route::put('/ticket/with_minor/{passenger}/{manifestDateId}', [TicketController::class, 'withMinor']);
    Route::put('/ticket/remove_minor/{passenger}/{manifestDateId}', [TicketController::class, 'removeMinor']);
    Route::put('/ticket/refund/{passenger}/{manifestDateId}', [TicketController::class, 'refund']);
    Route::put('/ticket/rebook/{passenger}/{manifestDateId}', [TicketController::class, 'rebook']);
    Route::put('/ticket/submit_manifest', [TicketController::class, 'submit']);

    Route::get('/settings/index', [SettingsController::class, 'index']);
    Route::post('/settings/fair/store', [SettingsController::class, 'fair_store']);
    Route::post('/settings/time/store', [SettingsController::class, 'time_store']);
    Route::post('/settings/time/update/{route}', [SettingsController::class, 'time_update']);
    Route::get('/settings/time/show/{route}', [SettingsController::class, 'show_time']);
    Route::post('/settings/ticket/store/', [SettingsController::class, 'ticket_store']);

    Route::get('/manifest', [ManifestDataController::class, 'index']);
    Route::get('/manifest/passengers/{manifest}', [ManifestDataController::class, 'show']);

    Route::get('/statistics/{month}', [StatisticsController::class, 'index']);

    Route::get('/staff/{limit}', [StaffController::class, 'index']);
    Route::get('/staff/department/{limit}', [StaffController::class, 'department']);
    Route::post('/staff/store', [StaffController::class, 'store']);
    Route::post('/staff/department/store/{department}', [StaffController::class, 'storeStaffDepartment']);
    Route::post('/staff/edit/{user}', [StaffController::class, 'update']);
    Route::delete('/staff/destroy/{user}', [StaffController::class, 'destroy']);
    Route::put('/staff/block/{user}', [StaffController::class, 'block']);
    Route::get('/staff/show/{user}', [StaffController::class, 'show']);
    Route::post('/staff/check-password/{user}', [StaffController::class, 'check']);

    // Manage Passenger Routes
    Route::controller(ManagePassenger::class)->group(function () {
        Route::post('/passenger/store', 'store');
        Route::get('/passenger/show/{passenger}', 'show');
        Route::delete('/passenger/destroy/{passenger}', 'destroy');
    });

    //manage departements and barangay
    Route::controller(DepartmentController::class)->group(function () {
        //get routes
        Route::get('/department/barangays/{limit}', 'index');
        Route::get('/department/departments/{limit}', 'departments');
        Route::get('department/barangay/get-seniors/{barangay}', 'getNumbers');
        Route::get('department/departments/get-staff/{department}', 'getStaffNumbers');
        Route::get('/department/staff/{limit}/{department}', 'getDepartmentStaff');
        Route::get('/get-seniors/{limit}/{barangay}', 'getSeniors');
        Route::get('/get-scanned-seniors/{limit}/{barangay}', 'getScannedSeniors');
        Route::get('/get-scanned-depertment-seniors/{limit}/{barangay}', 'getScannedSeniorsDepartment');

        //post routes
        Route::post('/department/barangay/update/{user}', 'update');
        Route::post('/department/barangay/store', 'store');
        Route::post('/department/departments/store', 'storeDepartment');

        //delete routes
        Route::delete('/department/destroy/{barangay}', 'destroy');
    });

    Route::controller(AnnouncementController::class)->group(function () {
        //get api
        Route::get('/announcement/index/{limit}', 'index');
        Route::get('/announcement/published/{limit}', 'getPublishedAnnouncement');
        //post api
        Route::post('/announcement/store', 'store');
        //put api
        Route::put('/announcement/edit/{announcement}', 'update');
        Route::put('/announcement/publish/{announcement}', 'publish');
        //delete api
        Route::delete('/announcement/destroy/{announcement}', 'destroy');
    });

    Route::controller(NotificationController::class)->group(function () {
        Route::get('/notification/index', 'index');
        Route::put('/notification/read-event', 'readEvent');
    });


});


Route::post('/register', [MangeController::class, 'insert']);

Route::apiResource('/passengers', MangeController::class);

Route::apiResource('/media', MediaController::class);

Route::get('/get-media', [MediaController::class, 'get_media']);

Route::post('/store-media/{passenger}', [MediaController::class, 'store']);

Route::get('profile_passengers', [MangeController::class, 'profile']);

// Route::middleware(['auth:passenger'])->group(function(){
//     Route::get('/dashboard', [MangeController::class, 'index']);
// });

Route::post('/user-login', [UserController::class, 'login']);

Route::controller(AddressController::class)->group(function() {
    Route::get('/get-provinces', 'provinces');
    Route::get('/get-cities/{province_id}', 'cities');
    Route::get('/get-barangay/{city_id}', 'barangays');
});