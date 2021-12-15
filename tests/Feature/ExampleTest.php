<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->post(
            '/api/audit',
            ['domain' => 'https://www.google.com']
        );

        $response->assertStatus(200);
    }
}
