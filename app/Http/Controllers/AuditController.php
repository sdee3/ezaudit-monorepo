<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Jobs\ProcessAudit;
use App\Models\Audit;

class AuditController extends Controller
{
	private string $validDomainRegex = '/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/';
	/**
	 * Sends a request to Lighthouse to audit a domain.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function __invoke()
	{
		// TODO: Steps:
		// 1. Queue an audit in the background - DONE
		// 2. Send successful response immediately - DONE
		// 3. Cleanup
		// 4. Profit

		$data = Request()->all();
		$domainFromRequest = $data['domain'];

		if (!preg_match($this->validDomainRegex, $domainFromRequest)) {
			return Response()->json([
				'message' => 'An invalid domain was provided! Please try again.'
			], 400);
		}

		$correctDomain = $domainFromRequest;

		if ((!str_starts_with($domainFromRequest, 'http://') && !str_starts_with($domainFromRequest, 'https://'))
			|| str_starts_with($domainFromRequest, 'http://')
		)
			$correctDomain = "https://" . $domainFromRequest;

		try {
			ProcessAudit::dispatch($correctDomain);
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
		$audits = Audit::all();

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
		$audit = Audit::where('id', $request['id'])->first();

		return Response()->json([
			'message' => $audit
		], 200);
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
}
