<?php

use App\Http\Controllers\AuditController;
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

Route::middleware('auth:sanctum')->get('/login', function () {
    if (Auth::user()) {
        return redirect('/telescope');
    }

    return redirect('/login');
});

Route::middleware('auth')->group(function () {
    Route::post('/audit', AuditController::class)->withoutMiddleware('auth');

    Route::get('/audits', [AuditController::class, 'index']);
    Route::get('/audits/{id}', [AuditController::class, 'single']);
});
