<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class SupportController extends Controller
{
    public function SendMessage(Request $request)
    {
        $user = User::where('token', '=', $request->header('Authorization'))->first();
        $result = $user->messages()->create([
            "text" => $request->message
        ]);
        if ($result) return response("Success", 200);
        return response("Error", 500);
    }
}
