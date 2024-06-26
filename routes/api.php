<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
});

// Route::middleware('auth:sanctum')->post('/add_dish', [AuthController::class, 'addDish']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('/dashboard', DashboardController::class);
Route::apiResource('/users', UserController::class);
Route::apiResource('/dishes', ItemController::class);
Route::apiResource('/orders', OrderController::class);
