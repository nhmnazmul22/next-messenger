<?php

namespace App\Services\AuthServices;

use App\Repository\UserRepository;

class AuthServices
{

   public function __construct(
      private readonly UserRepository $userRepository
   ) {}

   public function register(array $attributes)
   {
      return $this->userRepository->createUser($attributes);
   }

   public function login(array $credentials)
   {
      // Implement login logic here
   }

   public function logout()
   {
      // Implement logout logic here
   }
}
