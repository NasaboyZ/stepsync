<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use App\Models\Workout;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder {
    public function run() {
        // Erstellen von Benutzern
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
            'goal' => 'lose weight',
            'gender' => 'female',
            'date_of_birth' => '1992-02-02',
        ]);

        $charlie = User::create([
            'first_name' => 'Charlie',
            'last_name' => 'User',
            'username' => 'charlieuser',
            'email' => 'charlie@mailinator.com',
            'password' => Hash::make('password'),
            'weight' => 75.0,
            'height' => 1.85,
            'goal' => 'Increase Muscle size',
            'gender' => 'other',
            'date_of_birth' => '1985-03-03',
        ]);

        // Workouts für Alpha erstellen
        Workout::create([
            'category' => 'lifting',
            'description' => 'Bench Press',
            'weight' => 80,
            'repetitions' => 10,
            'user_id' => $alpha->id,
        ]);

        Workout::create([
            'category' => 'cardio',
            'description' => 'Running',
            'weight' => 55,
            'repetitions' => 55,
            'user_id' => $alpha->id,
        ]);

        // Workouts für Bravo erstellen
        Workout::create([
            'category' => 'cardio',
            'description' => 'Cycling',
            'weight' => 55,
            'repetitions' => 55,
            'user_id' => $bravo->id,
        ]);

        Workout::create([
            'category' => 'lifting',
            'description' => 'Squats',
            'weight' => 50,
            'repetitions' => 15,
            'user_id' => $bravo->id,
        ]);

        // Workouts für Charlie erstellen
        Workout::create([
            'category' => 'lifting',
            'description' => 'Deadlift',
            'weight' => 120,
            'repetitions' => 8,
            'user_id' => $charlie->id,
        ]);

        Workout::create([
            'category' => 'cardio',
            'description' => 'Swimming',
            'weight' => 55,
            'repetitions' => 55,
            'user_id' => $charlie->id,
        ]);

        // Beispielhafte Artikel und Tags
        for ($i = 0; $i < 60; $i++) {
            Article::create([
                'title' => fake()->word(),
                'content' => fake()->sentence(),
                'user_id' => 1,
            ]);
        }

        Tag::create(['name' => 'red']);
        Tag::create(['name' => 'green']);
        Tag::create(['name' => 'blue']);
        Tag::create(['name' => 'magenta']);
        Tag::create(['name' => 'cyan']);
        Tag::create(['name' => 'yellow']);
        Tag::create(['name' => 'black']);
        Tag::create(['name' => 'white']);
    }
}
