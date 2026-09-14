<?php

namespace App\Services;

use App\Models\Conversation;
use App\Repository\ConversationRepository;

class ConversationService
{

   public function __construct(
      private readonly ConversationRepository $conversationRepository,
   ) {}
   public function findOrCreateConversation(int $targetUserId): Conversation
   {

      $existingConversation = $this->conversationRepository->findConversation($targetUserId);
      if (isset($existingConversation)) {
         return $existingConversation;
      }

      $conversation = $this->conversationRepository->createConversation([
         'type' => 'private'
      ]);

      $conversation->users()->attach([auth()->id(), $targetUserId]);

      return $conversation;
   }

   public function conversationMessages(int $targetUserId)
   {
      $conversation = $this->findOrCreateConversation($targetUserId);

      return [
         'conversation' => $conversation,
         'messages' => $conversation->messages()
            ->orderBy('created_at')
            ->get(),
         'users' => $conversation->users()->whereKey($targetUserId)
      ];
   }
}
