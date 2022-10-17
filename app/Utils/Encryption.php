<?php

namespace App\Utils;

class Encryption
{
	public static function stringEncrypt(string $plainText)
	{
		$cipher   = 'aes-128-cbc';

		if (in_array($cipher, openssl_get_cipher_methods())) {
			$ivlen = openssl_cipher_iv_length($cipher);
			$iv = openssl_random_pseudo_bytes($ivlen);
			$ciphertext_raw = openssl_encrypt(
				$plainText,
				$cipher,
				env('APP_API_ENCRYPTION_KEY'),
				$options = OPENSSL_RAW_DATA,
				$iv
			);
			$hmac = hash_hmac('sha256', $ciphertext_raw, env('APP_API_ENCRYPTION_KEY'), true);
			$encodedText =
				strtr(base64_encode($iv . $hmac . $ciphertext_raw), '+/=', '._-');
		}

		return $encodedText;
	}

	public static function stringDecrypt(string $encodedText)
	{
		$c = base64_decode(strtr($encodedText, '._-', '+/='));
		$cipher   = 'aes-128-cbc';

		if (in_array($cipher, openssl_get_cipher_methods())) {
			$ivlen = openssl_cipher_iv_length($cipher);
			$iv = substr($c, 0, $ivlen);
			$hmac = substr($c, $ivlen, $sha2len = 32);
			$ivlenSha2len = $ivlen + $sha2len;
			$ciphertext_raw = substr($c, $ivlen + $sha2len);
			$plainText = openssl_decrypt(
				$ciphertext_raw,
				$cipher,
				env('APP_API_ENCRYPTION_KEY'),
				$options = OPENSSL_RAW_DATA,
				$iv
			);
		}

		return $plainText;
	}
}
