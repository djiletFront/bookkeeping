<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');
        if (!$token) {
            return response()->json(['error' => 'отсутствует авторизация'], 401)->header('Content-Type', 'application/json');
        }

        if (User::where('token', $token)->exists()) {
            return $next($request);
        }
        else {
            return response()->json(['error' => 'отсутствует авторизация'], 401)->header('Content-Type', 'application/json');
        }
    }
}
