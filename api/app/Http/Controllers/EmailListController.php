<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JWTAuth;
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
        $emails = $user->chef->emails;

        if ($emails) {
            return response()->json([
                'status' => 'success',
                'data' => $emails
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
