<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use App\Mail\PasswordChanged;
use Illuminate\Http\Request;
use JWTAuth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', [
            'except' =>
            [
                'login',
                'loginToTelescope',
                'register',
                'changePassword',
                'processResetPasswordRequest',
                'resetPassword'
            ]
        ]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make(['email' => $request->email, 'password' => $request->password], [
            'email' => 'required|email',
            'password' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$token = JWTAuth::attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    /**
     * Sends a password reset email if the User exists based on the email provided.
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function processResetPasswordRequest(Request $request)
    {
        if (!User::where('email', $request->email)->first()) {
            return response()->json(['message' => 'Invalid email address provided.'], 404);
        }

        $mailToSend = new ResetPassword($request->email);
        Mail::to($request->email)->cc(env('APP_TELESCOPE_EMAIL'))->send($mailToSend);

        return response()
            ->json(['message' => 'Password reset email sent.'], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(JWTAuth::refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(JWTAuth::user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => JWTAuth::user()
        ]);
    }

    public function changePassword(Request $request)
    {
        $defaultPassword = 'CHANGE_ME';
        $password = bcrypt($request->password);

        $user = User::where('email', $request->email)->first();

        if (!Hash::check($defaultPassword, $user->password)) {
            $mailToSend = new PasswordChanged();
            Mail::to($request->email)->cc(env('APP_TELESCOPE_EMAIL'))->send($mailToSend);
        }

        $user->password = $password;
        $user->save();

        return response()->json(['message' => 'Password changed.']);
    }

    public function loginToTelescope(Request $request)
    {
        $validator = Validator::make(['email' => $request->email, 'password' => $request->password], [
            'email' => 'required|email',
            'password' => 'string',
        ]);

        if ($validator->fails()) {
            return redirect('/login')->withErrors($validator->errors());
        }

        if (!$token = JWTAuth::attempt($validator->validated())) {
            return redirect('/login')->withErrors(['error' => 'Unauthorized']);
        }

        $this->createNewToken($token);

        return redirect('/telescope');
    }
}
