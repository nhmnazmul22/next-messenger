<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;

uses(RefreshDatabase::class);

it('registers a new user with valid data', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(201);
    $response->assertJson([
        'success' => true,
        'message' => 'User registered successfully.',
    ]);
    $response->assertJsonPath('data.name', 'John Doe');
    $response->assertJsonPath('data.email', 'john@example.com');
    $response->assertJsonMissingPath('data.password');
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
    $response->assertJson([
        'success' => true,
        'message' => 'User registered successfully.',
    ]);
    $response->assertJsonPath('data.avatarUrl', 'https://example.com/avatar.jpg');
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
    $response->assertJson([
        'success' => false,
    ]);
    $response->assertJsonValidationErrors(['name']);
    $response->assertJsonMissing(['data' => '']);
});

it('fails to register without email', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['email']);
});

it('fails to register without password', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['password']);
});

it('fails to register with invalid email', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'not-an-email',
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['email']);
});

it('fails to register with short password', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => '1234567',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
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
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['email']);
});

it('returns validation errors in the standard format', function () {
    $response = $this->postJson(route('auth.register'), [
        'name' => '',
        'email' => 'not-an-email',
        'password' => '123',
    ]);

    $response->assertStatus(422);
    $response->assertJsonStructure([
        'success',
        'message',
        'errors' => [
            'name',
            'email',
            'password',
        ],
    ]);
    $response->assertJsonPath('success', false);
});

it('logs in a user with valid credentials', function () {
    User::factory()->create([
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response = $this->postJson(route('auth.login'), [
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(Response::HTTP_OK);
    $response->assertJson([
        'success' => true,
        'message' => 'User logged in successfully.',
    ]);
    $response->assertJsonPath('data.email', 'john@example.com');
});

it('fails to login with wrong password', function () {
    User::factory()->create([
        'email' => 'john@example.com',
        'password' => 'password123',
    ]);

    $response = $this->postJson(route('auth.login'), [
        'email' => 'john@example.com',
        'password' => 'wrong-password',
    ]);

    $response->assertStatus(401);
    $response->assertJson([
        'success' => false,
        'message' => 'Invalid credentials provided.',
    ]);
});

it('fails to login with unregistered email', function () {
    $response = $this->postJson(route('auth.login'), [
        'email' => 'notfound@example.com',
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['email']);
});

it('fails to login without email', function () {
    $response = $this->postJson(route('auth.login'), [
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['email']);
});

it('fails to login without password', function () {
    $response = $this->postJson(route('auth.login'), [
        'email' => 'john@example.com',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['password']);
});

it('fails to login with invalid email', function () {
    $response = $this->postJson(route('auth.login'), [
        'email' => 'not-an-email',
        'password' => 'password123',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['email']);
});

it('fails to login with short password', function () {
    $response = $this->postJson(route('auth.login'), [
        'email' => 'john@example.com',
        'password' => '1234567',
    ]);

    $response->assertStatus(422);
    $response->assertJson(['success' => false]);
    $response->assertJsonValidationErrors(['password']);
});
