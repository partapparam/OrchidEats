<?php

namespace OrchidEats\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JWTAuth;
use OrchidEats\Mail\NewMenu;
use OrchidEats\Http\Requests\EmailListRequest;
use OrchidEats\Models\EmailList;
use OrchidEats\Models\Chef;

class EmailListController extends Controller
{
    /**
     * Handle profile request.
     * @return \Illuminate\Http\JsonResponse
     */

    public function show():JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = $user->chef;
        $chef->emails = $user->chef->emails;

        if ($chef->emails) {
            return response()->json([
                'status' => 'success',
                'data' => $chef
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }

    public function update(EmailListRequest $request):JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = $user->chef;

        $email = $chef->emails()->create(array(
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name
        ));

        if ($email) {
        return response()->json([
            'status' => 'success',
        ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }

    public function send(Request $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = $user->chef;
        $input = $request->all();
        $url = env('APP_URL') . '/marketplace-listing/' . $user->id;

//        confirm that person requesting email send is user.
        if ($user->id == $chef->chefs_user_id) {

            foreach ($input as $email) {
                if ($email['selected'] == 1) {
                    $email['chef'] = $user->first_name;
                    $email['url'] = $url;
                    \Mail::to($email['email'])->send(new NewMenu($email));
                    EmailList::where(['email' => $email['email'], 'emails_chef_id' => $chef->chef_id])->update(array(
                        'updated_at' => Carbon::now()
                    ));
                }
            }


            return response()->json([
                'status' => 'success',
                'data' => $input[0]
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'data' => $input[0]['email']
            ]);
        }

    }

    public function destroy(Request $request): JsonResponse
    {
        $user = JWTAuth::parseToken()->authenticate();
        $chef = $user->chef;
        $input = $request->all();
        $email = EmailList::find($request);

        if ($chef->chef_id === $email[0]->emails_chef_id) {
            EmailList::destroy($input);

            return response()->json([
                'status' => 'success',
                'message' => 'Email deleted'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unsuccessful, please try again'
            ], 200);
        }
    }



}
