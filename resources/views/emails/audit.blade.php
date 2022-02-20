<div>
	<h2>Your Audit is ready to be downloaded!</h2>
	<p>Hi! You recently requested an audit of <a href={{ $audit->domain }} target="_blank" rel="noopener noreferrer">{{
			$audit->domain }}</a> on EZ Audit. We are pleased to inform you that it&apos;s ready for viewing and exporting on
		your
		Dashboard!</a></p>

	<a href={{ env('APP_URL') . '/dashboard/audits/' . $audit->id . '?e=' . $encryptedPart}}
		target="_blank">
		<button>View Audit</button>
	</a>

	<br />

	<p>Cannot access the link in the button? Copy and paste the link below into your browser:</p>

	<a href={{ env('APP_URL') . '/dashboard/audits/' . $audit->id . '?e=' . $encryptedPart}}
		target="_blank">
		{{env('APP_URL') . '/dashboard/audits/' . $audit->id . '?e=' . $encryptedPart}}
	</a>

	<br />

	<p>Thank you for using EZ Audit!</p>
</div>