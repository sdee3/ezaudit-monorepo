<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Utils\Encryption;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Verifies a hashed email and retrieves the data. Split into two parts:
     * 
     * 1. If the user is newly created for the purpose of viewing their first audit, they will have `CHANGE_ME` as their default password. That request will not have an `isPasswordReset` property in the request.
     * 
     * 2. If the user requested a password reset, the request must have the `isPasswordReset` property set (to `y`, but basically any non-null value will work).
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illumminate\Http\JsonResponse
     */
    public function verifyHashedEmail(Request $request)
    {
        $isPasswordReset = $request->isPasswordReset === 'y';
        $defaultPassword = 'CHANGE_ME';
        $decryptedEmail = Encryption::stringDecrypt($request['hashedEmail']);

        $userMatchingEmail = DB::table('users')
            ->select('password')
            ->where('email', $decryptedEmail)
            ->first();

        if (
            !Hash::check($defaultPassword, $userMatchingEmail->password)
            && !$isPasswordReset
        ) {
            return response()->json(['message' => 'Not allowed.'], 400);
        }


        return response()->json(['email' => $decryptedEmail]);
    }
}
