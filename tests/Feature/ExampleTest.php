<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_homepage_hero_renders_all_configured_text(): void
    {
        $response = $this->get('/');

        $response->assertOk()
            ->assertSee('lives')
            ->assertSee('between rehearsals')
            ->assertSee('Explore the features')
            ->assertSee('for the people who bring people together')
            ->assertSee('font-heading text-4xl font-extrabold leading-[0.98] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl', false)
            ->assertSee('text-base px-6 py-3', false)
            ->assertSee('aspect-[9/2] w-full rounded-3xl object-cover object-center shadow-xl', false);
    }

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
