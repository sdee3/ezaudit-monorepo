<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Dzava\Lighthouse\Lighthouse;

class AuditController extends Controller
{
	/**
	 * Sends a request to Lighthouse to audit a domain.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function __invoke()
	{
		// TODO: Steps:
		// 1. Queue an audit in the background
		// 2. Send successful response immediately
		// 3. Cleanup
		// 4. Profit

		$data = Request()->all();
		$domainFromRequest = $data['domain'];
		$correctDomain = $domainFromRequest;

		if ((!str_starts_with($domainFromRequest, 'http://') && !str_starts_with($domainFromRequest, 'https://'))
			|| str_starts_with($domainFromRequest, 'http://')
		)
			$correctDomain = "https://" . $domainFromRequest;

		try {
			(new Lighthouse())
				->setLighthousePath('../node_modules/lighthouse/lighthouse-cli/index.js')
				->setNodePath(env('APP_NODE_PATH'))
				->setOutput('./storage/' . date('Y-m-d_H:i:s') . '-' . str_replace('https://', '', $correctDomain) . '-report.json')
				->accessibility()
				->bestPractices()
				->performance()
				->seo()
				->audit($correctDomain);
		} catch (\Throwable $th) {
			report($th);

			return response()->json([
				'message' => 'Error while processing! Please try again.'
			], 404);
		}

		return Response()->json(['output' => 'Command passed'], 200);
	}
}
