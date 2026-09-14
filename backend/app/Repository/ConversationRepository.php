<?php

namespace App\Repository;

use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;

class ConversationRepository
{
    public function __construct(
        private readonly Conversation $conversation
    ) {}



    public function findConversation(int $targetUserId): ?Conversation
    {
        return $this->conversation
            ->whereHas('users', function ($query) {
                $query->whereKey(Auth::user()->id);
            })
            ->whereHas('users', function ($query) use ($targetUserId) {
                $query->whereKey($targetUserId);
            })
            ->first();
    }

    public function createConversation(array $attributes)
    {
        return $this->conversation->create($attributes);
    }

    public function conversationMessages(int $conversationId)
    {
        return $this->conversation
            ->newQuery()
            ->findOrFail($conversationId)
            ->messages()
            ->orderBy('created_at')
            ->get();
    }
}
