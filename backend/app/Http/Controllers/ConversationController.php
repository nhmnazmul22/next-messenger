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

   public function getConversation(Request $request, int $targetUserId)
   {

      $conversation = $this->conversationService->createConversation($targetUserId);

      return ApiResponse::success(
         $conversation,
         'Conversation created or fetch successful',
         Response::HTTP_OK
      );
   }
}
