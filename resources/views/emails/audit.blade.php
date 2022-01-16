<div>
	<h2>Your Audit is ready to be downloaded!</h2>
	<p>Hi! You recently requested an audit of <a href={{ $audit->domain }} target="_blank" rel="noopener noreferrer">{{
			$audit->domain }}</a> on EZ Audit. We are pleased to inform you that it&apos;s ready for viewing and exporting on
		your
		Dashboard!</a></p>
	<a href={{env('APP_URL') . '/audits/' . $audit->id}} target="_blank">
		<button>View Audit</button>
	</a>
	<p>Thank you for using EZ Audit!</p>
</div>