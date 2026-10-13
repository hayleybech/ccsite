<?php

namespace App\Listeners;

use App\Services\ContactFormSpamGuard;
use Statamic\Events\FormSubmitted;

class CheckContactFormForSpam
{
    public function __construct(private ContactFormSpamGuard $guard)
    {
    }

    public function handle(FormSubmitted $event): void
    {
        $submission = $event->submission;

        $this->guard->check(
            $submission->form()->handle(),
            array_merge($submission->data()->all(), request()->all()),
            request()->ip()
        );
    }
}