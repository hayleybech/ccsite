<?php

namespace Tests\Unit;

use App\Services\ContactFormSpamGuard;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class ContactFormSpamGuardTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Cache::flush();
        config([
            'contact_spam.enabled' => true,
            'contact_spam.attempt_limit' => 2,
            'contact_spam.attempt_window_seconds' => 600,
            'contact_spam.minimum_completion_seconds' => 3,
            'contact_spam.duplicate_window_seconds' => 600,
            'contact_spam.cache_key_prefix' => 'test-contact-spam',
        ]);
    }

    public function test_valid_contact_submission_is_accepted(): void
    {
        $this->guard()->check('contact_us', $this->submission('A new enquiry'), '192.0.2.1');

        $this->assertTrue(true);
    }

    public function test_submission_below_minimum_time_is_rejected_generically(): void
    {
        try {
            $this->guard()->check('contact_us', $this->submission('Too quick', time()), '192.0.2.1');
            $this->fail('The submission should have been rejected.');
        } catch (ValidationException $exception) {
            $this->assertSame(
                ['Unable to submit your enquiry. Please review the form and try again.'],
                $exception->errors()['contact']
            );
        }
    }

    public function test_normalized_duplicate_submission_is_rejected(): void
    {
        $submission = $this->submission('Same  enquiry');
        $this->guard()->check('contact_us', $submission, '192.0.2.1');

        $submission['your_message'] = ' Same enquiry ';

        $this->expectException(ValidationException::class);
        $this->guard()->check('contact_us', $submission, '192.0.2.1');
    }

    public function test_client_is_rate_limited_after_configured_attempts(): void
    {
        $this->guard()->check('contact_us', $this->submission('First enquiry'), '192.0.2.1');
        $this->guard()->check('contact_us', $this->submission('Second enquiry'), '192.0.2.1');

        $this->expectException(ValidationException::class);
        $this->guard()->check('contact_us', $this->submission('Third enquiry'), '192.0.2.1');
    }

    public function test_other_forms_are_not_affected(): void
    {
        $this->guard()->check('other_form', [], '192.0.2.1');

        $this->assertTrue(true);
    }

    private function guard(): ContactFormSpamGuard
    {
        return $this->app->make(ContactFormSpamGuard::class);
    }

    private function submission(string $message, ?int $startedAt = null): array
    {
        return [
            '_contact_started_at' => $startedAt ?? time() - 10,
            'name' => 'Test User',
            'email' => 'test@example.com',
            'your_message' => $message,
        ];
    }
}