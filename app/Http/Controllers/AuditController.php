<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Jobs\ProcessAudit;
use App\Models\Audit;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use JWTAuth;

class AuditController extends Controller
{
	/**
	 * Sends a request to Lighthouse to audit a domain.
	 * If there is no user based on the email sent via the request,
	 * we will create one without a password.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function __invoke()
	{
		$data = Request()->all();
		$domainFromRequest = $data['domain'];
		$emailFromRequest = $data['email'];

		if (!preg_match(Audit::VALID_DOMAIN_REGEX, $domainFromRequest)) {
			return Response()->json([
				'message' => 'An invalid domain was provided! Please try again.'
			], 400);
		}

		if (!preg_match(Audit::VALID_DOMAIN_REGEX, $emailFromRequest)) {
			return Response()->json([
				'message' => 'An invalid email address was provided! Please try again.'
			], 400);
		}

		$correctDomain = $domainFromRequest;

		if ((!str_starts_with($domainFromRequest, 'http://') && !str_starts_with($domainFromRequest, 'https://'))
			|| str_starts_with($domainFromRequest, 'http://')
		)
			$correctDomain = "https://" . $domainFromRequest;

		try {
			$newUser = null;
			// Create a new passwordless user if the one provided doesn't exist
			if (!User::where('email', $emailFromRequest)->first()) {
				$newUser = User::create([
					'email' => $emailFromRequest,
					'password' => bcrypt('CHANGE_ME')
				]);
			}

			// But if a user was created and they did not set their new password
			// - "CHANGE_ME" is still their password -
			// we will still send the hash in the email link
			if (!$newUser) {
				$user = User::where('email', $emailFromRequest)->first();

				if ($user && Hash::check('CHANGE_ME', $user->password)) {
					$newUser = $user;
				}
			}

			ProcessAudit::dispatch($correctDomain, $emailFromRequest, $newUser !== null);
			return Response()->json(['message' => 'Audit scheduled successfully! You will receive an email once the audit is ready.'], 202);
		} catch (\Throwable $th) {
			report($th);

			return Response()->json([
				'message' => 'Error while processing! Please try again.'
			], 500);
		}
	}

	/**
	 * Gets all audits from database.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$user = JWTAuth::user();
		$audits = Audit::where('email', $user->email)->get();

		return Response()->json([
			'message' => $audits
		], 200);
	}

	/**
	 * Gets single audit from database matching given ID.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function single(Request $request)
	{
		$user = JWTAuth::user();
		$audit_by_id = Audit::where(['id' => $request['id']])->first();

		if (!$audit_by_id->is_public && !$user) {
			return Response()->json([
				'message' => 'Unauthorized'
			], 401);
		}

		if ($audit_by_id->is_public || $audit_by_id->email === $user->email) {
			return Response()->json([
				'message' => $audit_by_id
			], 200);
		}
	}

	/**
	 * Store a new audit in the database.
	 *
	 * @return void
	 */
	public function store($request)
	{
		// TODO: Validate the request...
		$audit = new Audit;

		$audit->domain = $request['domain'];
		$audit->email = $request['email'];
		$audit->date_of_request = $request['date_of_request'];
		$audit->audit_result = $request['audit_result'];

		$audit->save();
	}

	/**
	 * Toggles a provided Audit's is_public state and returns the updated audit.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function togglePublicStatus(Request $request)
	{
		$user = JWTAuth::user();
		$audit_to_update = Audit::where(
			['id' => $request['id'], 'email' => $user->email]
		)
			->first();

		if (!$audit_to_update) {
			return Response()->json([
				'message' => 'Unauthorized'
			], 401);
		}

		$is_public = $request['is_public'];

		$audit_to_update->is_public = $is_public;
		$audit_to_update->save();

		$updated_audit = $audit_to_update->fresh();

		return Response()->json([
			'message' => $updated_audit
		], 200);
	}
}
