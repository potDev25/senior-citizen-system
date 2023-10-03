<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index() {
        if(auth()->user()->role === 'barangay'){
            $unreadNotification       = Notification::where('status', 0)->where('barangay', auth()->user()->barangay)->get();
            $numberUnreadNotification = count($unreadNotification);
        }else if(auth()->user()->role === 'admin'){
            $unreadNotification       = Notification::where('status', 0)->get();
            $numberUnreadNotification = count($unreadNotification);
        }

        return response(compact('unreadNotification', 'numberUnreadNotification'));
    }

    public function readEvent(){
        Notification::where('type', 'announcement')->update(['status' => 1]);

        if(auth()->user()->role === 'barangay'){
            $unreadNotification       = Notification::where('status', 0)->where('barangay', auth()->user()->barangay)->get();
            $numberUnreadNotification = count($unreadNotification);
        }else if(auth()->user()->role === 'admin'){
            $unreadNotification       = Notification::where('status', 0)->get();
            $numberUnreadNotification = count($unreadNotification);
        }

        return response(compact('unreadNotification', 'numberUnreadNotification'));
    }
}
