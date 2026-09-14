<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequest;
use App\Services\MessageService;
use App\Support\ApiResponse;
use Symfony\Component\HttpFoundation\Response;

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

        $message = $this->messageService->sendMessage($sendMessageRequest->validated());

        return ApiResponse::success(
            $message,
            'Message send successful',
            Response::HTTP_CREATED
        );
    }
}
