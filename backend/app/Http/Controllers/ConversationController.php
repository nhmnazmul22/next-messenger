<?php

namespace App\Http\Controllers;

use App\Services\ConversationService;
use Illuminate\Http\Request;

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

      return $this->conversationService->createConversation($validated);
   }
}
