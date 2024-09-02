<?php

namespace App\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutsController {
  
  // Gibt alle Workouts des angemeldeten Benutzers zurück
  function index(Request $request) {
    return \Auth::user()->workouts()->get();
  }

  // Erstellt ein neues Workout für den angemeldeten Benutzer
  function create(Request $request) {
    $payload = Workout::validate($request);
    $workout = \Auth::user()->workouts()->create($payload);
    return $workout;
  }

  // Aktualisiert ein Workout
  function update(Request $request, $id) {
    $workout = \Auth::user()->workouts()->find($id);

    if (!$workout) {
      return response()->json(['message' => 'Workout not found'], 404);
    }

    $payload = Workout::validate($request);
    $workout->update($payload);

    return $workout;

  }

  // Löscht ein Workout
  function destroy(Request $request, $id) {
    $workout = \Auth::user()->workouts()->findOrFail($id);
    $workout->delete();
    return response()->json(['message' => 'Workout deleted successfully']);
  }
}
