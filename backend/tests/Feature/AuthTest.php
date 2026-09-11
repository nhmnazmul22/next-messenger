<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('registers a new user with valid data', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(201);
    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);
});

it('registers a new user with avatar', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'password' => 'password123',
        'avatarUrl' => 'https://example.com/avatar.jpg',
    ]);

    $response->assertStatus(201);
    $this->assertDatabaseHas('users', [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'avatarUrl' => 'https://example.com/avatar.jpg',
    ]);
});

it('fails to register without name', function () {
    $response = $this->postJson(route('auth.register'), [
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['name']);
});

it('fails to register without email', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email']);
});

it('fails to register without password', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['password']);
});

it('fails to register with invalid email', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'not-an-email',
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email']);
});

it('fails to register with short password', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => '1234567',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['password']);
});

it('fails to register with duplicate email', function () {
    User::factory()->create([
        'email' => 'john@example.com',
    ]);

    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email']);
});
