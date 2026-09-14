<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Arif Rahman',
                'email' => 'arif@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=1',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Nusrat Jahan',
                'email' => 'nusrat@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=2',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Sakib Hasan',
                'email' => 'sakib@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=3',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Mim Akter',
                'email' => 'mim@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=4',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Tanvir Ahmed',
                'email' => 'tanvir@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=5',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Sadia Islam',
                'email' => 'sadia@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=6',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Fahim Chowdhury',
                'email' => 'fahim@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=7',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Jannatul Ferdous',
                'email' => 'jannatul@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=8',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Rafi Ahmed',
                'email' => 'rafi@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=9',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Sumaiya Rahman',
                'email' => 'sumaiya@example.com',
                'avatarUrl' => 'https://i.pravatar.cc/150?img=10',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($users as $user) {
            User::factory()->create($user);
        }
    }
}
