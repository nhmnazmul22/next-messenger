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

   /**
    * Send a message
    */

   public function createConversation(Request $request)
   {
      $validated = $request->validate([
         'userId' => ['required', 'int', 'exists:users,id']
      ]);

      $conversation = $this->conversationService->createConversation($validated);

      return ApiResponse::success(
         $conversation,
         'Conversation created or fetch successful',
         Response::HTTP_OK
      );
   }
}
