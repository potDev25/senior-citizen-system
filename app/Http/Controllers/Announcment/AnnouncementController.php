<?php

namespace App\Http\Controllers\Announcment;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Department;
use App\Models\Notification;
use App\Models\Passenger;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $limit)
    {
        $announcements = Announcement::paginate($limit);

        return response(compact('announcements'));
    }

    public function getPublishedAnnouncement(int $limit)
    {
        $announcements = Announcement::where('status', 1)->paginate($limit);

        return response(compact('announcements'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = '';
        $request->validate([
            'title'        => 'required',
            'description'  => 'required',
            'type'         => 'required',
            'recipent'     => 'required',
        ]);

        if(isset($request->date)){
            $date = Carbon::parse($request->date)->format('M d, y H:i A');
        }

        $save = Announcement::create([
            'description' => $request->description,
            'title'       => $request->title,
            'date'        => isset($request->date) ? $date : null,
            'act_date'    => isset($request->date) ? $request->date : null,
            'type'        => $request->type,
            'user_id'     => auth()->user()->id,
            'recipents'   => $request->recipent,
        ]);

        if(!$save){
            return response([
                'error' => 'Server Error!'
            ], 422);
        }

        return response(200);
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
    public function update(Announcement $announcement ,Request $request)
    { 
        if(isset($request->type)){
            if($request->type === 'Announcements'){
                $announcement->date = null;
            }elseif($request->type === 'Event'){
                if(isset($request->date)){
                    $date = Carbon::parse($request->date)->format('M d, y H:i A');
                }
                $announcement->date = $date;
                $announcement->act_date = $request->date;
            }
        }else{
            $announcement->date = isset($request->date) ? Carbon::parse($request->date)->format('M d, y H:i A') : $announcement->date;
            $announcement->act_date = isset($request->date) ? $request->date : $announcement->act_date;
        }

        $announcement->description = isset($request->description) ? $request->description : $announcement->description;
        $announcement->title = isset($request->title) ? $request->title : $announcement->title;
        $announcement->type = isset($request->type) ? $request->type : $announcement->type;
        $announcement->recipents = isset($request->recipent) ? $request->recipent : $announcement->recipents;
        $save = $announcement->update();

        if(!$save){
            return response([
                'error' => 'Server Error!'
            ], 422);
        }

        return response(200);
    }

     /**
     * publish announcement
     */

    public function sendEmail(string $email, string $name, string $announcement) : bool{
        $email_data = [
            'recipient' => $email,
            'fromEmail' => "scims@gmail.com",
            'fromName' => 'Senior Citizen Management System.',
            'subject' => 'Announcement',
            'email' => $email,
            'name' => $name,
            'announcement' => $announcement
        ];

        $sent = Mail::send('mail.announcement', $email_data, function($message) use ($email_data){
            $message->to($email_data['recipient'])
                    ->from($email_data['fromEmail'], $email_data['fromName'])
                    ->subject($email_data['subject']);
        });

        if(!$sent){
            return false;
        }

        return true;
    }

    public function publish(Announcement $announcement){
        if($announcement->status !== 1){

            $seniors = Passenger::where('verified', '!=', 0)
                        ->where('done', 1)
                        ->get();

            $barangayAdmin = User::where('role', 'barangay')->get();

            if($announcement->recipents === 'all'){
                foreach($seniors as $senior){
                    $this->sendEmail($senior->email, $senior->last_name.' '.$senior->first_name, $announcement->description);
                }
    
                foreach($barangayAdmin as $admin){
                   $this->sendEmail($admin->email, $admin->last_name.' '.$admin->first_name, $announcement->description);
                }
            }else if($announcement->recipents === 'seniors'){
                foreach($seniors as $senior){
                    $this->sendEmail($senior->email, $senior->last_name.' '.$senior->first_name, $announcement->description);
                }
            }else if($announcement->recipents === 'barangay_admins'){
                foreach($barangayAdmin as $admin){
                    $this->sendEmail($admin->email, $admin->last_name.' '.$admin->first_name, $announcement->description);
                }
            }

            $announcement->status = 1;
            $announcement->update();

            Notification::create([
                'notification' => 'New '.$announcement->type.' is created!',
                'type'         => 'announcement',
            ]);

            return response([
                'message' => 'Announcement published successfully'
            ], 200);
        }

        $announcement->status = 0;
        $announcement->update();

        return response([
            'message' => 'Announcement unpublished successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return response(200);
    }
}
