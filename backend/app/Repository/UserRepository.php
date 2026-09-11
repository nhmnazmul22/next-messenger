<?php

namespace App\Repository;

use App\Models\User;

class UserRepository
{
    public function __construct(
        private readonly User $user
    ) {}

    public function createUser(array $data)
    {
        return $this->user->create($data);
    }

    public function findByEmail(string $email)
    {
        return $this->user->where('email', $email)->first();
    }
}
