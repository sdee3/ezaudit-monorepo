<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AppendToken
{
	/**
	 * Handle the incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return \Illuminate\Http\Response
	 */
	public function handle(Request $request, Closure $next)
	{
		if (!Cookie::get('accessToken') || !str_contains(Cookie::get('user'), env('APP_TELESCOPE_EMAIL'))) {
			return redirect(env('APP_URL') . '/dashboard');
		}

		$response = $next($request);

		// Don't know what the rest does...
		if ($request->route()->getName() !== 'telescope') {
			return $response;
		}

		if ($request->cookie('accessToken')) {
			return $response;
		}

		if (empty($token = $request->input('token'))) {
			return $response;
		}

		$payload = JWTAuth::setToken($token)->getPayload();
		$exp = $payload->get('exp');
		$minutes = floor(($exp - time()) / 60);

		$response = $next($request);
		$response->withCookie(cookie('accessToken', $token, $minutes));

		return $response;
	}
}
