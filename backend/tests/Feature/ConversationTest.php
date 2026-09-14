<?php

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Symfony\Component\HttpFoundation\Response;

uses(RefreshDatabase::class);

it('requires authentication to create a conversation', function () {
    $target = User::factory()->create();

    $response = $this->getJson(route('get-conversation', ['targetUserId' => $target->id]));

    $response->assertStatus(Response::HTTP_UNAUTHORIZED);
});

it('creates a new private conversation with the target user', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();

    $this->actingAs($user);

    $response = $this->getJson(route('get-conversation', ['targetUserId' => $target->id]));

    $response->assertStatus(Response::HTTP_OK);
    $response->assertJson([
        'success' => true,
        'message' => 'Conversation created or fetch successful',
    ]);
    $response->assertJsonPath('data.type', 'private');

    $conversationId = $response->json('data.id');

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

it('returns the existing conversation instead of creating a duplicate', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();

    $conversation = Conversation::create(['type' => 'private']);
    $conversation->users()->attach([$user->id, $target->id]);

    $this->actingAs($user);

    $first = $this->getJson(route('get-conversation', ['targetUserId' => $target->id]));
    $first->assertStatus(Response::HTTP_OK);
    $first->assertJsonPath('data.id', $conversation->id);

    $second = $this->getJson(route('get-conversation', ['targetUserId' => $target->id]));
    $second->assertStatus(Response::HTTP_OK);
    $second->assertJsonPath('data.id', $conversation->id);

    $this->assertDatabaseCount('conversations', 1);
});

it('requires authentication to fetch conversation messages', function () {
    $conversation = Conversation::create(['type' => 'private']);

    $response = $this->getJson(
        route('conversation-messages', ['conversationId' => $conversation->id]),
    );

    $response->assertStatus(Response::HTTP_UNAUTHORIZED);
});

it('returns an empty message list for a conversation without messages', function () {
    $user = User::factory()->create();
    $target = User::factory()->create();

    $conversation = Conversation::create(['type' => 'private']);
    $conversation->users()->attach([$user->id, $target->id]);

    $this->actingAs($user);

    $response = $this->getJson(
        route('conversation-messages', ['conversationId' => $conversation->id]),
    );

    $response->assertStatus(Response::HTTP_OK);
    $response->assertJson([
        'success' => true,
        'message' => 'Messages retrieved successfully.',
    ]);
    $response->assertJsonCount(0, 'data');
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
        route('conversation-messages', ['conversationId' => $conversation->id]),
    );

    $response->assertStatus(Response::HTTP_OK);
    $response->assertJsonCount(2, 'data');
    $response->assertJsonPath('data.0.body', 'Older message');
    $response->assertJsonPath('data.0.user_id', $target->id);
    $response->assertJsonPath('data.1.body', 'Newer message');
    $response->assertJsonPath('data.1.user_id', $user->id);
});