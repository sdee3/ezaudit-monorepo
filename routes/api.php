<?php

use App\Http\Controllers\AuditController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/login-telescope', [AuthController::class, 'loginToTelescope']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/validate', [AuthController::class, 'validateToken']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);

    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::get('/reset-password/{email}', [AuthController::class, 'processResetPasswordRequest']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
});

Route::middleware('auth')->group(function () {
    Route::get('/user/{hashedEmail}/{isPasswordReset}', [UserController::class, 'verifyHashedEmail'])->withoutMiddleware('auth');

    Route::post('/audit', AuditController::class)->withoutMiddleware('auth');

    Route::get('/audits', [AuditController::class, 'index']);
    Route::get('/audits/{id}', [AuditController::class, 'single']);
});
