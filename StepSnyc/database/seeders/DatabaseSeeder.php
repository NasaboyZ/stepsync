<?php

namespace Database\Seeders;

use App\Models\Blogpost;
use App\Models\Tag;
use App\Models\User;
use App\Models\Workout;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder {
    public function run() {
        // Benutzer erstellen
        $alpha = User::create([
            'first_name' => 'Alpha',
            'last_name' => 'User',
            'username' => 'alphauser',
            'email' => 'alpha@mailinator.com',
            'password' => Hash::make('password'),
            'weight' => 70.0,
            'height' => 1.75,
            'goal' => 'Increase Muscle size',
            'gender' => 'male',
            'date_of_birth' => '1990-01-01',
        ]);

        $bravo = User::create([
            'first_name' => 'Bravo',
            'last_name' => 'User',
            'username' => 'bravouser',
            'email' => 'bravo@mailinator.com',
            'password' => Hash::make('password'),
            'weight' => 80.0,
            'height' => 1.80,
            'goal' => 'Lose Weight',
            'gender' => 'female',
            'date_of_birth' => '1992-05-15',
        ]);

        // Blogposts für Benutzer 'Alpha' erstellen
        Blogpost::create([
            'title' => 'Nulla suscipit',
            'content' => 'Repellendus aut dolores minima et consequatur et.',
            'user_id' => $alpha->id,
        ]);

        Blogpost::create([
            'title' => 'Sapiente quis',
            'content' => 'Non quibusdam et aut id voluptatibus.',
            'user_id' => $alpha->id,
        ]);

        // Blogposts für Benutzer 'Bravo' erstellen
        Blogpost::create([
            'title' => 'Autem dolor',
            'content' => 'Vel autem incidunt recusandae et voluptatibus.',
            'user_id' => $bravo->id,
        ]);

        // Tags erstellen
        $tag1 = Tag::create(['name' => 'Fitness']);
        $tag2 = Tag::create(['name' => 'Wellness']);
        $tag3 = Tag::create(['name' => 'Health']);

        // Tags zu Blogposts zuordnen
        Blogpost::find(1)->tags()->attach([$tag1->id, $tag2->id]);
        Blogpost::find(2)->tags()->attach([$tag2->id]);
        Blogpost::find(3)->tags()->attach([$tag1->id, $tag3->id]);
    }
}
