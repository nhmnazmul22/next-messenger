<?php

namespace App\Services;

use App\Events\SendMessage;
use App\Models\Message;
use App\Repository\MessageRepository;

class MessageService
{

    public function __construct(
        private readonly MessageRepository $messageRepository,
    ) {}
    public function sendMessage(array $attributes): Message
    {

        $message = $this->messageRepository->createMessage([
            'conversation_id' => $attributes['conversationId'],
            'user_id' => $attributes['senderId'],
            'body' => $attributes['body'],
        ]);

        broadcast(new SendMessage($message))->toOthers();
        return $message;
    }
}
