<?php

namespace App\Services;

use App\Repository\UserRepository;

class UserServices
{
    public function __construct(
        private readonly UserRepository $userRepository,
    ) {}

    public function getAllUsers()
    {
        return $this->userRepository->findAllUsers();
    }

}
