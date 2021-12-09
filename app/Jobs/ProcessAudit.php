<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Dzava\Lighthouse\Lighthouse;

class ProcessAudit implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected string $domainToAudit;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $domainToAudit, string $email = null)
    {
        $this->domainToAudit = $domainToAudit;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            (new Lighthouse())
                ->setLighthousePath(env('APP_LIGHTHOUSE_PATH'))
                ->setNodePath(env('APP_NODE_PATH'))
                ->setOutput(env('APP_PATH') . '/storage/' . date('Y-m-d_H:i:s') . '-' . str_replace('https://', '', $this->domainToAudit) . '-report.json')
                ->accessibility()
                ->bestPractices()
                ->performance()
                ->seo()
                ->audit($this->domainToAudit);
        } catch (\Dzava\Lighthouse\Exceptions\AuditFailedException $e) {
            report($e->getOutput());
        }
    }
}
