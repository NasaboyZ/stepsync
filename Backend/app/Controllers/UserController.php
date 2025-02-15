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

  function show(Request $request)
  {
    $user = Auth::user();
    $age = \Carbon\Carbon::parse($user->date_of_birth)->age;

    return response()->json([
      'firstName' => $user->first_name,
      'lastName' => $user->last_name,
      'email' => $user->email,
      'username' => $user->username,
      'weight' => (float) $user->weight,
      'height' => (float) $user->height,
      'gender' => $user->gender,
      'goal' => $user->goal,
      'date_of_birth' => $user->date_of_birth,
      'age' => $age,
      'id' => $user->id,

    ]);
  }


  function showChallenges()
  {
    $user = Auth::user();

    $challenges = $user->challenges()->get();

    return response()->json([
      'challenges' => $challenges
    ]);
  }


  function create(Request $request)
  {
    $payload = User::validate($request);
    $user = User::create($payload);


    $bmi = new BMI();
    $bmi->height = $payload['height'];
    $bmi->weight = $payload['weight'];
    $bmi->user_id = $user->id;
    $bmi->save();


    $challengesController = new ChallengesController();


    $token = Str::random(64);
    $user->verification_token = $token;
    $user->save();

    Mail::raw(
      'Please verify your email using this token: ' . $token,
      fn($mail) => $mail->to($user->email)->subject('Email Verification')
    );

    return response()->json([
      'message' => 'User created successfully',
      'user' => $user->fresh('challenges'),
    ], 201);
  }


  function update(Request $request)
  {
    $user = Auth::user();
    $payload = User::validate($request);
    $user->update($payload);

    if (isset($payload['weight']) || isset($payload['height'])) {
      $bmi = BMI::where('user_id', $user->id)->first() ?? new BMI();
      $bmi->weight = $payload['weight'] ?? $bmi->weight;
      $bmi->height = $payload['height'] ?? $bmi->height;
      $bmi->user_id = $user->id;
      $bmi->save();
    }

    return $user;
  }


  function destroy(Request $request)
  {
    $user = Auth::user();
    $user->delete();
    return $user;
  }


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
      $user->verification_token = '';
      $user->save();

      return response()->json(['message' => 'Email successfully verified'], 200);
    }

    return response()->json(['message' => 'Invalid token'], 400);
  }


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

    $avatarPath = null;
    if ($user->avatar) {
      $avatarPath = Storage::url($user->avatar->path);
    }

    return response()->json([
      'message' => 'Login successful',
      'token' => $token,
      'user' => [
        'id' => $user->id,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'email' => $user->email,
        'username' => $user->username,
        'avatar' => $avatarPath
      ],
    ], 200);
  }


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
