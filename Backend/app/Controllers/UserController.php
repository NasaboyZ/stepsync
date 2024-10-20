<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\BMI;
use App\Controllers\ChallengesController;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

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

    // Verifizierungs-Token generieren
    $token = Str::random(64);
    $user->verification_token = $token;
    $user->save();

    // E-Mail mit Verifizierungstoken senden
    Mail::raw(
      'Please verify your email using this token: ' . $token,
      fn($mail) => $mail->to($user->email)->subject('Email Verification')
    );

    return $user->fresh('challenges');
  }

  function update(Request $request)
  {
    $user = \Auth::user();
    $payload = User::validate($request);
    $user->update($payload);
    return $user;
  }
  public function verifyEmail(Request $request)
  {
    // Validierung des Tokens
    $request->validate([
      'email' => 'required|email',
      'token' => 'required|string',
    ]);

    // Benutzer anhand der E-Mail-Adresse finden
    $user = User::where('email', $request->input('email'))->first();

    if (!$user) {
      return response()->json([
        'message' => 'User not found'
      ], 404);
    }

    // Prüfen, ob der Token übereinstimmt
    if ($user->verification_token === $request->input('token')) {
      // Token validieren, email_verified_at setzen und Token zurücksetzen
      $user->email_verified_at = now();
      $user->verification_token = null;
      $user->save();

      return response()->json([
        'message' => 'Email successfully verified'
      ], 200);
    }

    return response()->json([
      'message' => 'Invalid token'
    ], 400);
  }
  // Login mit Token-Verifizierung
  public function login(Request $request)
  {
    $credentials = $request->only('email', 'password');
    $user = User::where('email', $credentials['email'])->first();

    if (!$user || !\Hash::check($credentials['password'], $user->password)) {
      return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Überprüfe, ob die E-Mail verifiziert wurde
    if (is_null($user->email_verified_at)) {
      return response()->json(['message' => 'Please verify your email address'], 403);
    }

    // Authentifizierungstoken erstellen (z.B. mit Laravel Passport oder Sanctum)
    return response()->json(['message' => 'Login successful']);
  }


  function destroy(Request $request)
  {
    $user = \Auth::user();
    $user->delete();
    return $user;
  }
}
