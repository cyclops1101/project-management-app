<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if(!User::where('email','mcknight.jeremy@gmail.com')->exists()) {
            User::factory()->create([
                'name' => 'Cyclops',
                'email' => 'mcknight.jeremy@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            ]);
        }

        Project::factory(30)->hasTasks(30)->create();
    }
}
