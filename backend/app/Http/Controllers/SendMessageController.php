<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequest;
use App\Services\MessageService;

class SendMessageController extends Controller
{
    public function __construct(
        private readonly MessageService $messageService
    ) {}

    /**
     * Send a message
     */

    public function sendMessage(SendMessageRequest $sendMessageRequest)
    {

        return $this->messageService->sendMessage($sendMessageRequest->validated());
    }
}
