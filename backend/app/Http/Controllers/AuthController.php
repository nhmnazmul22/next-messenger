<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthServices;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

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
            Response::HTTP_CREATED,
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
                Response::HTTP_UNAUTHORIZED,
            );
        }

        if ($request->hasSession()) {
            $request->session()->regenerate();
        }

        return ApiResponse::success(
            Auth::user(),
            'User logged in successfully.',
        );
    }

    /**
     * Logout a user
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return ApiResponse::success(
            null,
            'User logged out successfully.',
        );
    }

    /**
     * Get authenticated user
     */

    public function me(Request $request)
    {
        return ApiResponse::success(
            auth()->user(),
            'User profile retrieved successful',
        );
    }
}
