<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [\App\Http\Controllers\Api\AuthController:: class, 'login']);

Route::middleware('authApi')->group(function() {
    Route::get('profile', [\App\Http\Controllers\Api\ProfileController::class, 'GetProfile']);
    Route::put('profile', [\App\Http\Controllers\Api\ProfileController::class, 'UpdateProfile']);

    Route::get('receipt', [\App\Http\Controllers\Api\ReceiptController::class, 'GetReceipts']);
    Route::post('receipt', [\App\Http\Controllers\Api\ReceiptController::class, 'AddReceipt']);
    Route::delete('receipt/{id}', [\App\Http\Controllers\Api\ReceiptController::class, 'DeleteReceipt']);
    Route::get('receipt/{id}', [\App\Http\Controllers\Api\ReceiptController::class, 'GetReceipt']);
    Route::put('receipt', [\App\Http\Controllers\Api\ReceiptController::class, 'UpdateReceipt']);

    Route::post('message', [\App\Http\Controllers\Api\SupportController::class, 'SendMessage']);
});
