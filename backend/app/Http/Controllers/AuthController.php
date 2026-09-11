<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use App\Services\AuthServices;

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
