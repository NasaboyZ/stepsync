<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\BMI;
use App\Models\Challenges;
use App\Controllers\ChallengesController;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class UserController
{
  // Zeigt die Details eines Benutzers an
  function show(Request $request)
  {
    $user = Auth::user();
    $age = \Carbon\Carbon::parse($user->date_of_birth)->age;

    return response()->json([
      'username' => $user->username,
      'weight' => (float) $user->weight,
      'height' => (float) $user->height,
      'gender' => $user->gender,
      'goal' => $user->goal,
      'date_of_birth' => $user->date_of_birth,
      'age' => $age,
      'id' => $user->id,
      'avatar' => $user->avatar ? [
        'id' => $user->avatar->id,
        'url' => Storage::url($user->avatar->pathname)
      ] : null,
    ]);
  }

  // Listet alle Challenges des Benutzers auf
  function showChallenges()
  {
    $user = Auth::user();

    $challenges = $user->challenges()->get();

    return response()->json([
      'challenges' => $challenges
    ]);
  }

  // Benutzer erstellen
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
    // $challengesController->assignRandomChallengesToUser($user);

    // Verifizierungs-Token generieren
    $token = Str::random(64);
    $user->verification_token = $token;
    $user->save();

    // E-Mail mit Verifizierungstoken senden
    Mail::raw(
      'Please verify your email using this token: ' . $token,
      fn($mail) => $mail->to($user->email)->subject('Email Verification')
    );

    return response()->json([
      'message' => 'User created successfully',
      'user' => $user->fresh('challenges'),
    ], 201);
  }

  // Benutzerinformationen aktualisieren
  function update(Request $request)
  {
    $user = Auth::user();
    $payload = User::validate($request);
    $user->update($payload);
    return $user;
  }

  // Benutzer löschen
  function destroy(Request $request)
  {
    $user = Auth::user();
    $user->delete();
    return $user;
  }

  // E-Mail-Verifizierung
  public function verifyEmail(Request $request)
  {
    $request->validate([
      'email' => 'required|email',
      'token' => 'required|string',
    ]);

    $user = User::where('email', $request->input('email'))->first();

    if (!$user) {
      return response()->json(['message' => 'User not found'], 404);
    }

    if ($user->verification_token === $request->input('token')) {
      $user->email_verified_at = now();
      $user->verification_token = null;
      $user->save();

      return response()->json(['message' => 'Email successfully verified'], 200);
    }

    return response()->json(['message' => 'Invalid token'], 400);
  }

  // Benutzer-Login
  public function login(Request $request)
  {
    $credentials = $request->only('email', 'password');
    $user = User::where('email', $credentials['email'])->first();

    if (!$user || !\Hash::check($credentials['password'], $user->password)) {
      return response()->json(['message' => 'Invalid credentials'], 401);
    }

    if (is_null($user->email_verified_at)) {
      return response()->json(['message' => 'Please verify your email address'], 403);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
      'message' => 'Login successful',
      'token' => $token,
      'user' => [
        'id' => $user->id,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'email' => $user->email,
        'username' => $user->username,
      ],
    ], 200);
  }

  // Prüfen, ob ein Benutzername verfügbar ist
  public function checkUsername(Request $request)
  {
    $request->validate(['username' => 'required|string']);
    $exists = User::where('username', $request->username)->exists();

    if ($exists) {
      return response()->json(['message' => 'Username is already taken'], 409);
    }

    return response()->json(['message' => 'Username is available'], 200);
  }

  public function forgotPassword(Request $request)
  {
    $request->validate([
      'email' => 'required|email|exists:users',
    ]);

    $user = User::where('email', $request->email)->first();
    $token = Str::random(64);

    // Altes Token löschen und neues erstellen
    DB::table('password_reset_tokens')->where('email', $request->email)->delete();
    DB::table('password_reset_tokens')->insert([
      'email' => $request->email,
      'token' => $token,
      'created_at' => now()
    ]);

    // E-Mail mit Reset-Link senden
    Mail::raw(
      'Klicken Sie hier, um Ihr Passwort zurückzusetzen: ' .
        config('app.frontend_url') . '/reset-password?token=' . $token,
      fn($mail) => $mail->to($request->email)->subject('Password Reset')
    );

    return response()->json(['message' => 'Password reset link sent']);
  }

  public function resetPassword(Request $request)
  {
    $request->validate([
      'token' => 'required',
      'email' => 'required|email',
      'password' => [
        'required',
        'min:8',
        'regex:/[a-z]/',
        'regex:/[A-Z]/',
        'regex:/[0-9]/',
        'regex:/[@$!%*#?&]/',
        'not_regex:/\s/'
      ],
    ]);

    $resetRecord = DB::table('password_reset_tokens')
      ->where('email', $request->email)
      ->where('token', $request->token)
      ->first();

    if (!$resetRecord) {
      return response()->json(['message' => 'Invalid token'], 400);
    }

    // Prüfen ob Token abgelaufen ist (Standard: 60 Minuten)
    if (now()->diffInMinutes($resetRecord->created_at) > config('auth.passwords.timeout', 60)) {
      return response()->json(['message' => 'Token expired'], 400);
    }

    $user = User::where('email', $request->email)->first();
    $user->password = $request->password;
    $user->save();

    DB::table('password_reset_tokens')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Password has been reset']);
  }
}
