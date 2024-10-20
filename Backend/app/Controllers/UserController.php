<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\BMI;
use App\Controllers\ChallengesController;
use Illuminate\Http\Request;

class UserController
{
  function show(Request $request)
  {
    return \Auth::user();
  }

  function create(Request $request)
  {
    $payload = User::validate($request);
    $user = User::create($payload);

    // BMI speichern
    $bmi = new BMI();
    $bmi->height = $payload['height'];
    $bmi->weight = $payload['weight'];
    $bmi->user_id = $user->id;
    $bmi->save();

    // Zufällige Challenges dem Benutzer zuweisen
    $challengesController = new ChallengesController();
    $challengesController->assignRandomChallengesToUser($user);

    // Willkommens-Mail senden
    \Mail::raw(
      'Welcome to our app',
      fn($mail) => $mail->to($user->email)->subject('Welcome')
    );

    return $user->fresh('challenges'); // Benutzer und die zugewiesenen Challenges zurückgeben
  }

  function update(Request $request)
  {
    $user = \Auth::user();
    $payload = User::validate($request);
    $user->update($payload);
    return $user;
  }

  function destroy(Request $request)
  {
    $user = \Auth::user();
    $user->delete();
    return $user;
  }
}
