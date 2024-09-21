<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController {
  function show(Request $request) {
    return \Auth::user();
  }

  function create(Request $request) {
    $payload = User::validate($request);
    $user = User::create($payload);

    \Mail::raw(
      'welcome to our app',
      fn($mail) => $mail->to($user->email)->subject('welcome')
    );

    return $user;
  }

  function update(Request $request) {
    $user = \Auth::user();
    $payload = User::validate($request);
    $user->update($payload);
    return $user;
  }

  function destroy(Request $request) {
    $user = \Auth::user();
    $user->delete();
    return $user;
  }
}
