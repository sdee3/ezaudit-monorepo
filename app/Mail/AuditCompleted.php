<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AuditCompleted extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public ?string $dateOfAudit = null;
    public ?string $auditedDomain = null;
    public ?string $outputPath = null;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($dateOfAudit, $auditedDomain, $outputPath)
    {
        $this->dateOfAudit = $dateOfAudit;
        $this->auditedDomain = $auditedDomain;
        $this->outputPath = $outputPath;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from('hello@ezaudit.me')
            ->view('emails.audit')
            ->attach($this->outputPath);
    }
}
