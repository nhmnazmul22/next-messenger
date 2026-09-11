<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthServices;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $user = $this->authServices->register($validatedData);

        return ApiResponse::success(
            $user,
            'User registered successfully.',
            201,
        );
    }

    /**
     * Login a user
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (! Auth::attempt($credentials)) {
            return ApiResponse::error(
                'Invalid credentials provided.',
                [],
                401,
            );
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return ApiResponse::success([
            'user' => $user,
            'token' => $token,
        ], 'User logged in successfully.');
    }

    /**
     * Logout a user
     */
    public function logout(Request $request)
    {
        //
    }
}
