<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserServices;
use App\Support\ApiResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function __construct(
        private readonly UserServices $userServices
    ) {}

    /**
     * Register a new user
     */
    public function index(Request $request)
    {
        $users = $this->userServices->getAllUsers();

        return ApiResponse::success(
            $users,
            'Users retrieved successfully.',
            Response::HTTP_OK,
        );
    }

    /**
     * Login a user
     */
    public function show(Request $request, User $user)
    {
        return ApiResponse::success(
            $user,
            'User retrieved successfully.',
        );
    }

}
