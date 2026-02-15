# Laravel API Backend (SQLite)

This folder contains the API code wired for the React frontend.

## 1) Create Laravel project (if not already)

From this folder:

- `composer create-project laravel/laravel .`
- `composer require laravel/sanctum`
- `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`

Then copy/merge the files in this folder into the Laravel project structure.

## 2) Environment

Use SQLite in `.env`:

- `DB_CONNECTION=sqlite`
- `DB_DATABASE=database/database.sqlite`

Create DB file:

- `type nul > database/database.sqlite` (Windows)

## 3) Migrate + seed

- `php artisan migrate:fresh --seed`

## 4) Run API

- `php artisan serve`

The frontend uses `VITE_API_BASE_URL=http://127.0.0.1:8000/api`.

## Demo users

- Admin: `admin@focus.com` / `password`
- User: `user@gmail.com` / `password`
