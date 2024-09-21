<?php

namespace App\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;


class WorkoutsController {
  
  // Gibt alle Workouts des angemeldeten Benutzers zurück
  function index(Request $request) {
    return Workout::all();
  }

  // Erstellt ein neues Workout für den angemeldeten Benutzer
  function create(Request $request) {
    $payload = Workout::validate($request);
    $workout = \Auth::user()->workouts()->create($payload);
    return $workout;
}


  function update(Request $request) {
    $payload = Workout::validate($request);
    // $Workout = Workout::create($payload);
    $Workout = \Auth::user()->Workouts()->create($payload);
    return $Workout;

  }

  // Löscht ein Workout
  function destroy(Request $request) {
    $workout = \Auth::user()->workouts()->findOrFail($request->input("id"));
    $workout->delete();
    return response()->json(['message' => 'Workout deleted successfully']);
  }
}
