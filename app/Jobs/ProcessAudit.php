<?php

namespace App\Jobs;

use App\Mail\AuditCompleted;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Dzava\Lighthouse\Lighthouse;
use Illuminate\Support\Facades\Mail;

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
            $dateOfAudit = date('Y-m-d_H:i:s');
            $outputPath = env('APP_PATH') . '/storage/' . $dateOfAudit . '-' . str_replace('https://', '', $this->domainToAudit) . '-report.json';
            $mailToSend = new AuditCompleted($dateOfAudit, $this->domainToAudit, $outputPath);

            (new Lighthouse())
                ->setLighthousePath(env('APP_LIGHTHOUSE_PATH'))
                ->setNodePath(env('APP_NODE_PATH'))
                ->setOutput($outputPath)
                ->accessibility()
                ->bestPractices()
                ->performance()
                ->seo()
                ->audit($this->domainToAudit);

            Mail::to("stefd996@gmail.com")->send($mailToSend);
        } catch (\Dzava\Lighthouse\Exceptions\AuditFailedException $e) {
            return $e->getOutput();
        }
    }
}
