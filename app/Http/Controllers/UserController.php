<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Utils\Encryption;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function verifyHashedEmail(Request $request)
    {
        $defaultPassword = 'CHANGE_ME';
        $decryptedEmail = Encryption::stringDecrypt($request['hashedEmail']);

        $userMatchingEmail = DB::table('users')
            ->select('password')
            ->where('email', $decryptedEmail)
            ->first();

        if (!Hash::check($defaultPassword, $userMatchingEmail->password)) {
            return response()->json(['message' => 'Not allowed.'])->status(400);
        }

        return response()->json(['message' => 'User needs to change password.', 'email' => $decryptedEmail]);
    }
}
