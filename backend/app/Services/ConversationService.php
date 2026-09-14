<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\Message;
use App\Repository\ConversationRepository;

class ConversationService
{

   public function __construct(
      private readonly ConversationRepository $conversationRepository,
   ) {}
   public function createConversation(array $attributes): Conversation
   {

      $existingConversation = $this->conversationRepository->findConversation($attributes['userId']);
      if (isset($existingConversation)) {
         return $existingConversation;
      }

      $conversation = $this->conversationRepository->createConversation([
         'type' => 'private'
      ]);

      $conversation->users()->attach([auth()->id(), $attributes['userId']]);

      return $conversation;
   }
}
