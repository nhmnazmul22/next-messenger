<?php

namespace App\Services;

use App\Events\SendMessage;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MessageService
{
    public function send(
        User $user,
        Conversation $conversation,
        string $body
    ): Message {
        if (
            !$conversation->users()
                ->whereKey($user->id)
                ->exists()
        ) {
            abort(403, 'You are not a participant of this conversation.');
        }

        $message = DB::transaction(function () use (
            $user,
            $conversation,
            $body
        ) {
            return $conversation->messages()->create([
                'user_id' => $user->id,
                'conversation_id' => $conversation->id,
                'body' => $body,
            ]);
        });

        broadcast(new SendMessage($message))->toOthers();

        return $message;
    }
}
