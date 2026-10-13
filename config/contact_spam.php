<?php

return [
    'enabled' => env('CONTACT_SPAM_ENABLED', true),
    'attempt_limit' => (int) env('CONTACT_SPAM_ATTEMPT_LIMIT', 5),
    'attempt_window_seconds' => (int) env('CONTACT_SPAM_ATTEMPT_WINDOW', 600),
    'minimum_completion_seconds' => (int) env('CONTACT_SPAM_MINIMUM_SECONDS', 3),
    'duplicate_window_seconds' => (int) env('CONTACT_SPAM_DUPLICATE_WINDOW', 600),
    'cache_key_prefix' => env('CONTACT_SPAM_CACHE_PREFIX', 'contact-spam'),
];