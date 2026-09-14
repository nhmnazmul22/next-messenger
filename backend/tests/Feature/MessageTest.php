<?php

use App\Events\SendMessage;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;

use Symfony\Component\HttpFoundation\Response;

uses(RefreshDatabase::class);

it('requires authentication to send a message', function () {
    $response = $this->postJson(route('send.message'), [
        'senderId' => 1,
        'conversationId' => 1,
        'receiverId' => 2,
        'body' => 'Hello!',
    ]);

    $response->assertStatus(Response::HTTP_UNAUTHORIZED);
});

it('validates the message payload', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->postJson(route('send.message'), []);

    $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['senderId', 'conversationId', 'receiverId', 'body']);
});

it('sends a message and stores it', function () {
    $sender = User::factory()->create();
    $receiver = User::factory()->create();

    $conversation = Conversation::create(['type' => 'private']);
    $conversation->users()->attach([$sender->id, $receiver->id]);

    $this->actingAs($sender);

    $response = $this->postJson(route('send.message'), [
        'senderId' => $sender->id,
        'conversationId' => $conversation->id,
        'receiverId' => $receiver->id,
        'body' => 'Hello there!',
    ]);

    $response->assertStatus(Response::HTTP_CREATED);
    $response->assertJson([
        'success' => true,
        'message' => 'Message send successful',
    ]);
    $response->assertJsonPath('data.body', 'Hello there!');
    $response->assertJsonPath('data.conversation_id', $conversation->id);
    $response->assertJsonPath('data.user_id', $sender->id);

    $this->assertDatabaseHas('messages', [
        'conversation_id' => $conversation->id,
        'user_id' => $sender->id,
        'body' => 'Hello there!',
    ]);
});

it('dispatches the SendMessage broadcast event with the correct payload', function () {
    $sender = User::factory()->create();
    $receiver = User::factory()->create();

    $conversation = Conversation::create(['type' => 'private']);
    $conversation->users()->attach([$sender->id, $receiver->id]);

    $this->actingAs($sender);
    Event::fake();

    $response = $this->postJson(route('send.message'), [
        'senderId' => $sender->id,
        'conversationId' => $conversation->id,
        'receiverId' => $receiver->id,
        'body' => 'Broadcast me!',
    ]);

    $response->assertStatus(Response::HTTP_CREATED);

    Event::assertDispatched(SendMessage::class, function (SendMessage $event) use ($conversation, $sender) {
        return $event->message->conversation_id === $conversation->id
            && $event->message->user_id === $sender->id
            && $event->message->body === 'Broadcast me!';
    });

    Event::assertDispatched(SendMessage::class, function (SendMessage $event) use ($conversation) {
        $channels = $event->broadcastOn();

        return is_array($channels)
            && $channels[0] instanceof PrivateChannel
            && $channels[0]->name === 'private-conversation' . $conversation->id
            && $event->broadcastAs() === 'message.sent';
    });

    Event::assertDispatchedTimes(SendMessage::class, 1);
});

it('does not dispatch the broadcast event when validation fails', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    Event::fake();

    $this->postJson(route('send.message'), []);

    Event::assertNotDispatched(SendMessage::class);
});