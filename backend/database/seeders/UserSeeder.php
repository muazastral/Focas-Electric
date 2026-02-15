<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@focus.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'phone' => '012-3456789',
                'address' => 'Semambu HQ',
                'avatar' => 'https://i.pravatar.cc/150?u=admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@gmail.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'role' => 'user',
                'phone' => '019-8765432',
                'address' => 'No 123, Jalan Bukit, Kuantan',
                'avatar' => 'https://i.pravatar.cc/150?u=john',
            ]
        );

        User::updateOrCreate(
            ['email' => 'sarah@yahoo.com'],
            [
                'name' => 'Sarah Lee',
                'password' => Hash::make('password'),
                'role' => 'user',
                'phone' => '011-2345678',
                'address' => 'B-10, Taman Setia, KL',
                'avatar' => 'https://i.pravatar.cc/150?u=sarah',
            ]
        );
    }
}
