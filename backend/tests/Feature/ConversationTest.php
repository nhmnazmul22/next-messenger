<?php

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
use Symfony\Component\HttpFoundation\Response;

uses(RefreshDatabase::class);

it('requires authentication to fetch conversation messages', function () {
    $target = User::factory()->create();

    $response = $this->getJson(
        route('conversation-messages', ['targetUserId' => $target->id]),
    );

    $response->assertStatus(Response::HTTP_UNAUTHORIZED);
});

it('creates a new private conversation with the target user and returns empty messages', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();

    $this->actingAs($user);

    $response = $this->getJson(
        route('conversation-messages', ['targetUserId' => $target->id]),
    );

    $response->assertStatus(Response::HTTP_OK);
    $response->assertJson([
        'success' => true,
        'message' => 'Messages retrieved successfully.',
    ]);

    $conversationId = $response->json('data.conversation.id');

    $response->assertJsonPath('data.conversation.type', 'private');
    $response->assertJsonCount(0, 'data.messages');

    $this->assertNotNull($conversationId);
    $this->assertDatabaseHas('conversation_user', [
        'conversation_id' => $conversationId,
        'user_id' => $user->id,
    ]);
    $this->assertDatabaseHas('conversation_user', [
        'conversation_id' => $conversationId,
        'user_id' => $target->id,
    ]);
});

it('returns the target user in the response', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();

    $this->actingAs($user);

    $response = $this->getJson(
        route('conversation-messages', ['targetUserId' => $target->id]),
    );

    $response->assertStatus(Response::HTTP_OK);
    $response->assertJsonPath('data.users.id', $target->id);
    $response->assertJsonPath('data.users.name', $target->name);
});

it('returns the existing conversation instead of creating a duplicate', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();

    $conversation = Conversation::create(['type' => 'private']);
    $conversation->users()->attach([$user->id, $target->id]);

    $this->actingAs($user);

    $first = $this->getJson(route('conversation-messages', ['targetUserId' => $target->id]));
    $first->assertStatus(Response::HTTP_OK);
    $first->assertJsonPath('data.conversation.id', $conversation->id);

    $second = $this->getJson(route('conversation-messages', ['targetUserId' => $target->id]));
    $second->assertStatus(Response::HTTP_OK);
    $second->assertJsonPath('data.conversation.id', $conversation->id);

    $this->assertDatabaseCount('conversations', 1);
});

it('returns the messages of a conversation in chronological order', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();

    $conversation = Conversation::create(['type' => 'private']);
    $conversation->users()->attach([$user->id, $target->id]);

    $first = Message::create([
        'conversation_id' => $conversation->id,
        'user_id' => $target->id,
        'body' => 'Older message',
    ]);
    $first->created_at = now()->subMinutes(10);
    $first->save();

    $second = Message::create([
        'conversation_id' => $conversation->id,
        'user_id' => $user->id,
        'body' => 'Newer message',
    ]);
    $second->created_at = now()->subMinutes(5);
    $second->save();

    $this->actingAs($user);

    $response = $this->getJson(
        route('conversation-messages', ['targetUserId' => $target->id]),
    );

    $response->assertStatus(Response::HTTP_OK);
    $response->assertJsonCount(2, 'data.messages');

    $messages = $response->json('data.messages');
    $bodies = Arr::pluck($messages, 'body');
    $userIds = Arr::pluck($messages, 'user_id');

    expect($bodies)->toBe(['Older message', 'Newer message']);
    expect($userIds)->toBe([$target->id, $user->id]);
});
