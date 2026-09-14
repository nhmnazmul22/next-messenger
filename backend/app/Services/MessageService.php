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

        $message = $this->messageRepository->createMessage($attributes);

        broadcast(new SendMessage($message))->toOthers();
        return $message;
    }
}
