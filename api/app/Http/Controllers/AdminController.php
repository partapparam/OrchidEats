<?php

namespace OrchidEats\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class AdminController extends Controller
{
//    Get all the users. Add the rest of the details for the admin page on to the get request.
    public function show() {
       $data = DB::table('users as u')
           ->join('profiles as p', 'u.id', 'p.profiles_user_id')
           ->get();

       return response()->json([
           'status' => 'success',
           'data' => $data
        ]);
    }

//    Store the updated changes from the admin page
    public function update(Request $request) {
        $inputs = $request->all();

        foreach ($inputs as $input) {
            $data = DB::table('users')
            ->where('id', '=', $input['id'])
            ->update(array('is_chef' => $input['is_chef']));
        }
        return response()->json([
            'status' => 'success',
            'message' => $data
        ]);
    }
}
