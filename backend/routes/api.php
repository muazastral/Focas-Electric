<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CmsPageController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/news', [NewsController::class, 'index']);
Route::get('/pages', [CmsPageController::class, 'index']);
Route::get('/pages/{slug}', [CmsPageController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/orders', [OrderController::class, 'mine']);

    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/orders', [AdminController::class, 'orders']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::get('/pages', [CmsPageController::class, 'index']);
        Route::post('/pages', [CmsPageController::class, 'store']);
        Route::put('/pages/{page}', [CmsPageController::class, 'update']);
        Route::delete('/pages/{page}', [CmsPageController::class, 'destroy']);
        Route::get('/media', [MediaController::class, 'index']);
        Route::post('/media', [MediaController::class, 'store']);
        Route::delete('/media/{media}', [MediaController::class, 'destroy']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    });
});
