<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\AuthServices\AuthServices;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function __construct(
        private readonly AuthServices $authServices
    ) {}

    /**
     * Register a new user
     */
    public function register(RegisterRequest $request)
    {
        $validatedData = $request->validated();
        return $this->authServices->register($validatedData);
    }

    /**
     * Login a user
     */
    public function login(Request $request)
    {
        //
    }

    /**
     * Logout a user
     */
    public function logout(Request $request)
    {
        //
    }
}
