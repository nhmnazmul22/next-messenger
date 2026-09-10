<?php

namespace App\Repository\UserRepository;

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

   public function login(array $credentials)
   {
      // Implement login logic here
   }

   public function logout()
   {
      // Implement logout logic here
   }
}
