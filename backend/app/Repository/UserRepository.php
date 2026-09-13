<?php

namespace App\Repository;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository
{
    public function __construct(
        private readonly User $user
    ) {}

    public function findAllUsers()
    {
        return $this->user
            ->where('id', '!=', Auth::id())
            ->get();
    }

    public function createUser(array $data)
    {
        return $this->user->create($data);
    }

    public function findById(int $id)
    {
        return $this->user->find($id)->first();
    }

    public function findByEmail(string $email)
    {
        return $this->user->where('email', $email)->first();
    }
}
