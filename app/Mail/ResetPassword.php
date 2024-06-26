<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Utils\Encryption;

class ResetPassword extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public ?string $emailEncypted = '';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $email)
    {
        $this->emailEncypted = Encryption::stringEncrypt($email);
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
            ->view('emails.password-reset');
    }
}
