<?php
namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use JWTAuth;
use OrchidEats\Models\User;
use OrchidEats\Models\Inbox;

class InboxController extends Controller
{
    /**
     * Handle profile request.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id):JsonResponse
    {
        $user = User::find($id);
        $data = Inbox::where('from_user_id', '=', $user->id)->orWhere('to_user_id', '=', $user->id)->orderBy('created_at', 'desc')->get()->groupBy('room_id');
        $convos = array();
        $convo = array();
//        get the to user info for each conversation.
        foreach ($data as $d) {
            if ($user->id == $d[0]['to_user_id']) {
                $to = User::find($d[0]['from_user_id']);
            } else {
                $to = User::find($d[0]['to_user_id']);
            }
            $convo['name'] = $to->first_name;
            $convo['to_user_id'] = $to->id;
            $convo['photo'] = $to->profile->photo;
            $convo['room_id'] = $d[0]['room_id'];
            $convo['last'] = $d[0]['message'];
            array_push($convos, $convo);
        }


        if ($convos) {
            return response()->json([
                'status' => 'success',
                'data' => $convos,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User data not found'
            ], 404);
        }
    }

    public function messages($id)
    {
        $data = Inbox::where('room_id', '=', $id)->orderBy('created_at', 'asc')->get();

        foreach ($data as $d) {
            $sender = User::find($d['from_user_id']);
            $to = User::find($d['to_user_id']);
            $d->sender = $sender->first_name;
            $d->to = $to->first_name;
        }

        return $data;
    }
}
