<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function GetProfile(Request $request)
    {
        $profile = User::where("token", "=", $request->header('Authorization'))
            ->first();
        if ($profile) {
            return response()->json($profile, 200)
                ->header('Content-Type', 'application/json');
        }
        return response("Error", 500);
    }

    public function UpdateProfile(Request $request)
    {
        $name = $request->name;
        $surname = $request->surname;
        $login = $request->login;
        $email = $request->email;
        $phone = $request->phone;
        $password = $request->password;

        $token = $request->header('Authorization');

        $profile = User::where("token", "=", $request->header('Authorization'))
            ->first();
        $profile->name = $name;
        $profile->surname = $surname;

        if ($this->checkForMatches("login", $login, $token)) {
            return response()->json("login", 409)
                ->header('Content-Type', 'application/json');
        }
        $profile->login = $login;

        if ($this->checkForMatches("phone", $phone, $token)) {
            return response()->json("phone", 409)
                ->header('Content-Type', 'application/json');
        }
        $profile->phone = $phone;

        if ($this->checkForMatches("email", $email, $token)) {
            return response()->json("email", 409)
                ->header('Content-Type', 'application/json');
        }
        $profile->email = $email;        

        if (boolval($password)) {
            $profile->password = Hash::make($password);
        }

        $res = $profile->save();

        if ($res) {
            return response("Success", 200); 
        }
        return response("Error", 500); 
    }

    private function checkForMatches($field, $value, $token)
    {
        return User::where([
            ["token", "!=", $token],
            [$field, "=", $value]
        ])->count();
    }
}
