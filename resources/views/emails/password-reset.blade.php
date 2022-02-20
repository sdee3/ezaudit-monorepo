<div>
	<h2>EZ Audit - Password reset</h2>

	<p>Hi! You recently requested a password reset. Please click on the link below to reset your password.</p>

	<p><strong>If you did not make this request, please ignore this email.</strong></p>

	<a href={{ env('APP_URL') . '/dashboard/password-reset' . '?e=' . $emailEncypted}} target="_blank">
		<button>Reset Password</button>
	</a>

	<br />

	<p>Cannot access the link in the button? Copy and paste the link below into your browser:</p>
	<a href={{ env('APP_URL') . '/dashboard/password-reset' . '?e=' . $emailEncypted}} target="_blank">
		{{env('APP_URL') . '/dashboard/password-reset' . '?e=' . $emailEncypted}}
	</a>

	<br />

	<p>Thank you for using EZ Audit!</p>
</div>