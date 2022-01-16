<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Audit;

class AuditCompleted extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public ?Audit $audit = null;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Audit $audit)
    {
        $this->audit = $audit;
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
            ->view('emails.audit');
    }
}
