<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    // Seeds my account for Telescope
    if (env('APP_ENV') === 'production') {
      DB::table('users')->insert([
        'id' => 1,
        'name' => 'Stefan Djokic',
        'email' => env('APP_TELESCOPE_EMAIL'),
        'password' => Hash::make(env('APP_TELESCOPE_PASSWORD')),
      ]);
    }
  }
}
