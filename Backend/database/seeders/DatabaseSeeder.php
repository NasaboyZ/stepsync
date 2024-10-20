<?php

namespace Database\Seeders;

use App\Models\Blogpost;
use App\Models\Challenges;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create users
        $alpha = User::create([
            'first_name'    => 'Alpha',
            'last_name'     => 'User',
            'username'      => 'alphauser',
            'email'         => 'alpha@mailinator.com',
            'password'      => Hash::make('password'),
            'weight'        => 70.0,
            'height'        => 1.75,
            'goal'          => 'Increase Muscle Size',
            'gender'        => 'male',
            'date_of_birth' => '1990-01-01',
        ]);

        $bravo = User::create([
            'first_name'    => 'Bravo',
            'last_name'     => 'User',
            'username'      => 'bravouser',
            'email'         => 'bravo@mailinator.com',
            'password'      => Hash::make('password'),
            'weight'        => 80.0,
            'height'        => 1.80,
            'goal'          => 'Lose Weight',
            'gender'        => 'female',
            'date_of_birth' => '1992-05-15',
        ]);

        // Create blog posts for user 'Alpha'
        $blogpost1 = Blogpost::create([
            'title'   => 'Nulla suscipit',
            'content' => 'Repellendus aut dolores minima et consequatur et.',
            'user_id' => $alpha->id,
        ]);

        $blogpost2 = Blogpost::create([
            'title'   => 'Sapiente quis',
            'content' => 'Non quibusdam et aut id voluptatibus.',
            'user_id' => $alpha->id,
        ]);

        // Create blog post for user 'Bravo'
        $blogpost3 = Blogpost::create([
            'title'   => 'Autem dolor',
            'content' => 'Vel autem incidunt recusandae et voluptatibus.',
            'user_id' => $bravo->id,
        ]);

        // Create tags
        $tag1 = Tag::create(['name' => 'Fitness']);
        $tag2 = Tag::create(['name' => 'Wellness']);
        $tag3 = Tag::create(['name' => 'Health']);

        // Assign tags to blog posts
        $blogpost1->tags()->attach([$tag1->id, $tag2->id]);
        $blogpost2->tags()->attach([$tag2->id]);
        $blogpost3->tags()->attach([$tag1->id, $tag3->id]);


        // Create challenges
        $challenge1 = Challenges::create([
            'title'       => '10k Steps Daily',
            'description' => 'Walk at least 10,000 steps daily for a week.',
            'goal'        => '10,000 Steps',
            'status'      => true, // Use boolean value
            'start_date'  => now(),
            'end_date'    => now()->addDays(7),
        ]);

        $challenge2 = Challenges::create([
            'title'       => 'Drink 2L Water',
            'description' => 'Drink at least 2 liters of water each day for a month.',
            'goal'        => '2L Water Daily',
            'status'      => true, // Use boolean value
            'start_date'  => now(),
            'end_date'    => now()->addMonth(),
        ]);


        $challenge3 = Challenges::create([
            'title'       => '30-Day Yoga Challenge',
            'description' => 'Practice yoga every day for 30 days.',
            'goal'        => 'Daily Yoga',
            'status'      => true,
            'start_date'  => now(),
            'end_date'    => now()->addDays(30),
        ]);

        // Assign challenges to users
        $alpha->challenges()->attach([$challenge1->id, $challenge2->id]);
        $bravo->challenges()->attach([$challenge1->id, $challenge3->id]);


        // Optionally, you can sync challenges to replace any existing assignments
        // $alpha->challenges()->sync([$challenge1->id, $challenge3->id]);
        // $bravo->challenges()->sync([$challenge1->id, $challenge2->id, $challenge3->id]);
    }
}
