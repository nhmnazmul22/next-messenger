<?php

namespace App\Services;

use App\Repository\UserRepository;
use Illuminate\Http\Request;

class AuthServices
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly Request $request
    ) {}

    public function register(array $attributes)
    {
        return $this->userRepository->createUser($attributes);
    }

    public function logout()
    {
        // Implement logout logic here
    }
}
