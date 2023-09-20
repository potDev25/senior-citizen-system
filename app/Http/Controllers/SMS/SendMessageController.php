<?php

namespace App\Http\Controllers\SMS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SendMessageController extends Controller
{
    public function index(){
        $basic  = new \Vonage\Client\Credentials\Basic("b5f22330", "ILGE6aNamFmsPUza");
        $client = new \Vonage\Client($basic);

        $response = $client->sms()->send(
            new \Vonage\SMS\Message\SMS("639360944819", 'Example', 'Daku kag Uso')
        );

        $message = $response->current();

        if ($message->getStatus() == 0) {
            echo "The message was sent successfully\n";
        } else {
            echo "The message failed with status: " . $message->getStatus() . "\n";
        }
    }
}
