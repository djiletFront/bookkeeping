<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use PhpParser\Node\Expr\Print_;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $login = $request->login;
        $password = $request->password;

        $user = User::where("login", "=", $login)->first();

        if ($user && Hash::check($password, $user['password'])) {
            $token = Str::random(60);
            $user->token = 'Bearer ' . $token;
            $user->save();
            return response()->json([
                    'token' => $token
                ], 200)->header('Content-Type', 'application/json');
        } else {
            return response()->json(['error' => 'неверный логин или пароль'], 401)->header('Content-Type', 'application/json');
        }

    }

    public function logout(Request $request)
    {
        $userData = User::where('token', $request->header('Authorization'))->first();
        $userData->token = '';
        $userData->save();
        return response()->json(['message' => 'вы разлогинились'], 200)->header('Content-Type', 'application/json');
    }

}
