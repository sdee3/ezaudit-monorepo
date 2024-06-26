<?php

namespace App\Jobs;

use App\Mail\AuditCompleted;
use App\Models\Audit;
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
    protected string $email;
    protected bool $toNewUser;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(string $domainToAudit, string $email = "stefd996@gmail.com", bool $toNewUser = false)
    {
        $this->domainToAudit = $domainToAudit;
        $this->email = $email;
        $this->toNewUser = $toNewUser;
    }

    /**
     * Cleans a requested URL by removing HTTP(s):// and 
     * replacing all trailing slashes with dashes (-) or
     * with an empty string if a slash is the last character.
     */
    private function cleanDomain(): string
    {
        $nonHttpUrl = str_replace('https://', '', $this->domainToAudit);
        $cleanedNonHttpUrl = str_replace('/', '-', $nonHttpUrl);

        if (str_ends_with($cleanedNonHttpUrl, '-')) {
            return rtrim($cleanedNonHttpUrl, '-');
        }

        return $cleanedNonHttpUrl;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $dateOfAudit = date('c');
            $outputPath = env('APP_PUBLIC_PATH') . '/storage/' . $dateOfAudit . '-' . $this->cleanDomain() . '-report.json';

            (new Lighthouse())
                ->setLighthousePath(env('APP_LIGHTHOUSE_PATH'))
                ->setNodePath(env('APP_NODE_PATH'))
                ->setOutput($outputPath)
                ->accessibility()
                ->bestPractices()
                ->performance()
                ->seo()
                ->audit($this->domainToAudit);

            $auditResultRaw = file_get_contents($outputPath);
            $decodedResults = json_decode($auditResultRaw, true);
            $auditResultJson = json_encode($decodedResults['categories']);

            $audit = Audit::create([
                'domain' => $this->domainToAudit,
                'date_of_request' => $dateOfAudit,
                'email' => $this->email,
                'audit_result' => $auditResultJson
            ]);

            // Send audit result email
            // If a new user was just created, send a different link for a password reset.
            $mailToSend = new AuditCompleted($audit, $this->toNewUser);

            Mail::to($this->email)->cc(env('APP_TELESCOPE_EMAIL'))->send($mailToSend);
        } catch (\Dzava\Lighthouse\Exceptions\AuditFailedException $e) {
            report($e->getOutput());
        }
    }
}
