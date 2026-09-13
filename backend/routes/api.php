<?php

use App\Events\SendMessage;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::prefix('auth')->as('auth.')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/auth/me', [AuthController::class, 'me'])->name('me');
    Route::apiResource('/users', UserController::class)->only(['index', 'show']);
});

Route::get('/test-broadcast', function () {
    event(new SendMessage('Hello from Laravel'));

    return response()->json([
        'message' => 'Broadcast sent',
    ]);
});
