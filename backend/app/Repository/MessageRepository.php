<?php

namespace App\Repository;

use App\Models\Message;

class MessageRepository
{
    public function __construct(
        private readonly Message $message
    ) {}



    public function createMessage(array $data)
    {
        return $this->message->create($data);
    }
}
