<?php

namespace Tests\Feature;

use Tests\TestCase;

class AuditControllerTest extends TestCase
{
    /**
     * Tests /api/audit with an invalid domain parameter.
     *
     * @return void
     */
    public function test_audit_invalid()
    {
        $response = $this->postJson('/api/audit', ['domain' => 'google', 'email' => '']);
        $response->assertStatus(400);
    }

     /**
     * Tests /api/audit with a valid domain parameter.
     *
     * @return void
     */
    public function test_audit_valid()
    {
        $response = $this->postJson('/api/audit', ['domain' => 'www.google.com', 'email' => 'test@test.com']);
        $response->assertStatus(202);
    }
}
