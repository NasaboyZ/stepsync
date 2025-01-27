<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRules;

class MailsController
{
  /**
   * Bestehende E-Mail-Sendefunktion
   */
  public function send(Request $request)
  {
    $subject = $request->input('subject');
    $content = $request->input('content');
    $to = $request->input('to');

    Mail::raw(
      $content,
      fn($mail) => $mail->to($to)->subject($subject)
    );

    return 'mail sent to:' . $to;
  }

  /**
   * Password-Reset-Link per E-Mail senden
   */
  public function sendResetLinkEmail(Request $request): JsonResponse
  {
    $request->validate(['email' => 'required|email']);

    $user = User::where('email', $request->email)->first();
    if (!$user) {
      return response()->json([
        'status' => false,
        'message' => 'User nicht gefunden'
      ], 404);
    }

    $token = Str::random(64);

    // Altes Token löschen und neues erstellen
    \DB::table('password_reset_tokens')->where('email', $request->email)->delete();
    \DB::table('password_reset_tokens')->insert([
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

    return response()->json([
      'status' => true,
      'message' => 'Password reset link wurde gesendet'
    ]);
  }

  /**
   * Passwort zurücksetzen
   */
  public function resetPassword(Request $request): JsonResponse
  {
    $request->validate([
      'token' => 'required',
      'email' => 'required|email',
      'password' => ['required', 'confirmed', PasswordRules::defaults()],
    ]);

    $tokenData = \DB::table('password_reset_tokens')
      ->where('email', $request->email)
      ->where('token', $request->token)
      ->first();

    if (!$tokenData || now()->diffInMinutes($tokenData->created_at) > 60) {
      return response()->json([
        'status' => false,
        'message' => 'Token abgelaufen oder ungültig'
      ], 400);
    }

    $user = User::where('email', $request->email)->first();
    if (!$user) {
      return response()->json([
        'status' => false,
        'message' => 'User nicht gefunden'
      ], 404);
    }

    $user->password = Hash::make($request->password);
    $user->save();

    // Token nach erfolgreicher Änderung löschen
    \DB::table('password_reset_tokens')->where('email', $request->email)->delete();

    // Alle bestehenden Tokens des Users löschen
    $user->tokens()->delete();

    return response()->json([
      'status' => true,
      'message' => 'Password wurde erfolgreich zurückgesetzt'
    ]);
  }
}
