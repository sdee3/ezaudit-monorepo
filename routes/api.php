<?php

use App\Http\Controllers\AuditController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->get('/login', function () {
    if (Auth::user()) {
        return redirect('/telescope');
    }

    return redirect('/login');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/login-telescope', [AuthController::class, 'loginToTelescope']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);

    Route::post('/change-password', [AuthController::class, 'changePassword']);
});

Route::middleware('auth')->group(function () {
    Route::get('/user/{hashedEmail}', [UserController::class, 'verifyHashedEmail'])->withoutMiddleware('auth');


    Route::post('/audit', AuditController::class)->withoutMiddleware('auth');

    Route::get('/audits', [AuditController::class, 'index']);
    Route::get('/audits/{id}', [AuditController::class, 'single']);
});
