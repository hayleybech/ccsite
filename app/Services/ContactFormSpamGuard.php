<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class ContactFormSpamGuard
{
    public function check(string $formHandle, array $data, ?string $ip): void
    {
        if ($formHandle !== 'contact_us' || ! config('contact_spam.enabled')) {
            return;
        }

        $startedAt = filter_var($data['_contact_started_at'] ?? null, FILTER_VALIDATE_INT);
        $minimumTime = (int) config('contact_spam.minimum_completion_seconds');

        if (! $startedAt || time() - $startedAt < $minimumTime) {
            $this->reject();
        }

        $prefix = config('contact_spam.cache_key_prefix');
        $ipHash = hash_hmac('sha256', (string) $ip, config('app.key'));
        $attemptKey = "{$prefix}:attempts:{$ipHash}";
        $attemptLimit = (int) config('contact_spam.attempt_limit');
        $attemptWindow = (int) config('contact_spam.attempt_window_seconds');

        if (! Cache::add($attemptKey, 1, $attemptWindow)) {
            if (Cache::increment($attemptKey) > $attemptLimit) {
                $this->reject();
            }
        }

        $normalized = [
            mb_strtolower(trim((string) ($data['name'] ?? ''))),
            mb_strtolower(trim((string) ($data['email'] ?? ''))),
            preg_replace('/\s+/', ' ', trim((string) ($data['your_message'] ?? ''))),
        ];
        $duplicateHash = hash_hmac('sha256', serialize($normalized), config('app.key'));
        $duplicateKey = "{$prefix}:duplicate:{$duplicateHash}";

        if (! Cache::add($duplicateKey, true, (int) config('contact_spam.duplicate_window_seconds'))) {
            $this->reject();
        }
    }

    private function reject(): never
    {
        throw ValidationException::withMessages([
            'contact' => __('Unable to submit your enquiry. Please review the form and try again.'),
        ]);
    }
}