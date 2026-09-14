<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\SendMessageController;
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

    Route::post('/send-message', [SendMessageController::class, 'sendMessage'])
        ->name('send.message');

    Route::get("/conversation/{targetUserId}", [ConversationController::class, 'getConversation'])
        ->name('get-conversation');

    Route::get('/conversation/{conversationId}/messages', [ConversationController::class, 'conversationMessages'])
        ->name('conversation-messages');
});
