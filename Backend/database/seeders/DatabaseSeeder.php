<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {

        $alpha = User::create([
            'first_name'    => 'Alpha',
            'last_name'     => 'User',
            'username'      => 'alphauser',
            'email'         => 'alpha@mailinator.com',
            'password'      => Hash::make('Pizzaria123_!'),
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
            'password'      => Hash::make('Pizzaria123_!'),
            'weight'        => 80.0,
            'height'        => 1.80,
            'goal'          => 'Lose Weight',
            'gender'        => 'female',
            'date_of_birth' => '1992-05-15',
        ]);
    }
}
