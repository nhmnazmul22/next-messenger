<?php

namespace App\Http\Controllers;

use App\Services\ConversationService;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConversationController extends Controller
{
    public function __construct(
        private readonly ConversationService $conversationService
    ) {}

    public function conversationMessages(Request $request, int $targetUserId)
    {

        $messages = $this->conversationService->conversationMessages($targetUserId);

        return ApiResponse::success(
            $messages,
            'Messages retrieved successfully.',
            Response::HTTP_OK
        );
    }
}
