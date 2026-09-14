<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use App\Repository\ConversationRepository;
use Illuminate\Database\Eloquent\Collection;

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
            'type' => 'private',
        ]);

        $conversation->users()->attach([auth()->id(), $targetUserId]);

        return $conversation;
    }

    /**
     * @return array{conversation: Conversation, messages: Collection<int, Message>, users: User|null}
     */
    public function conversationMessages(int $targetUserId): array
    {
        $conversation = $this->findOrCreateConversation($targetUserId);

        return [
            'conversation' => $conversation,
            'messages' => $conversation->messages()
                ->orderBy('created_at')
                ->get(),
            'users' => $conversation->users()->whereKey($targetUserId)->first(),
        ];
    }
}
