<?php

namespace App\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class WorkoutsController
{

  // Gibt alle Workouts des angemeldeten Benutzers zurück
  function index(Request $request)
  {
    return \Auth::user()->workouts()->get();
  }

  // Erstellt ein neues Workout für den angemeldeten Benutzer
  function create(Request $request)
  {
    $payload = Workout::validate($request);

    // Füge automatisch is_completed = false hinzu
    $payload['is_completed'] = false;
    $payload['completed_at'] = null;

    // Erstelle das Workout und verknüpfe es automatisch mit dem User
    $workout = \Auth::user()->workouts()->create($payload);

    return $workout;
  }


  function update(Request $request)
  {
    $rules = [
      'id' => 'required|exists:workouts,id',
      'category' => 'sometimes|string|in:cardio,krafttraining',
      'title' => 'sometimes|string|max:255',
      'description' => 'sometimes|string',
      'weight' => 'sometimes|nullable|integer|min:0',
      'repetitions' => 'sometimes|nullable|integer|min:0',
      'distance' => 'sometimes|nullable|numeric|min:0',
      'distance_unit' => 'sometimes|nullable|string|in:meter,kilometer',
      'is_completed' => 'sometimes|boolean',
    ];

    $payload = $request->validate($rules);
    $workout = \Auth::user()->workouts()->findOrFail($request->input('id'));

    // Wenn sich die Kategorie ändert, setze die nicht mehr relevanten Felder auf NULL
    if (isset($payload['category']) && $payload['category'] !== $workout->category) {
      if ($payload['category'] === 'cardio') {
        $payload['weight'] = null;
      } else if ($payload['category'] === 'krafttraining') {
        $payload['distance'] = null;
        $payload['distance_unit'] = null;
      }
    }

    // Setze completed_at basierend auf is_completed
    if (isset($payload['is_completed'])) {
      $payload['completed_at'] = $payload['is_completed'] ? now() : null;
    }

    $workout->update($payload);
    return $workout;
  }

  // Löscht ein Workout
  function destroy(Request $request)
  {
    $workout = \Auth::user()->workouts()->findOrFail($request->input("id"));
    $workout->delete();
    return response()->json(['message' => 'Workout deleted successfully']);
  }

  // Neue Methode für Workout-Statistiken
  public function getStatistics(Request $request)
  {
    $user = \Auth::user();
    $timeframe = $request->query('timeframe', '12_months');
    $category = $request->query('category', 'all');

    $query = $user->workouts()
      ->where('is_completed', true)  // Nur abgeschlossene Workouts zählen
      ->where('completed_at', '!=', null);

    // Kategorie-Filter
    if ($category !== 'all') {
      $query->where('category', $category);
    }

    // Zeitraum-Filter und Gruppierung
    switch ($timeframe) {
      case '7_days':
        $query->where('completed_at', '>=', now()->subDays(7))
          ->select(
            DB::raw('DATE(completed_at) as date'),
            DB::raw('COUNT(*) as frequency')
          )
          ->groupBy(DB::raw('DATE(completed_at)'))
          ->orderBy('date', 'ASC');
        break;

      case '12_months':
        $query->where('completed_at', '>=', now()->subMonths(12))
          ->select(
            DB::raw('DATE_FORMAT(completed_at, "%Y-%m") as date'),
            DB::raw('COUNT(*) as frequency')
          )
          ->groupBy(DB::raw('DATE_FORMAT(completed_at, "%Y-%m")'))
          ->orderBy('date', 'ASC');
        break;

      case '5_years':
        $query->where('completed_at', '>=', now()->subYears(5))
          ->select(
            DB::raw('YEAR(completed_at) as date'),
            DB::raw('COUNT(*) as frequency')
          )
          ->groupBy(DB::raw('YEAR(completed_at)'))
          ->orderBy('date', 'ASC');
        break;
    }

    $statistics = $query->get();

    // Formatierung der Daten für das Frontend
    $formattedData = $statistics->map(function ($item) use ($timeframe) {
      $date = $item->date;
      if ($timeframe === '7_days') {
        $date = date('D', strtotime($item->date)); // Wochentag (Mo, Di, etc.)
      } else if ($timeframe === '12_months') {
        $date = date('M', strtotime($item->date . '-01')); // Monatsname
      }

      return [
        'date' => $date,
        'frequency' => $item->frequency,
      ];
    });

    return response()->json($formattedData);
  }

  // Neue Methode für Workout-Status-Update
  public function updateStatus(Request $request, $id)
  {
    $workout = \Auth::user()->workouts()->findOrFail($id);
    $workout->is_completed = $request->input('is_completed', false);
    $workout->completed_at = $workout->is_completed ? now() : null;
    $workout->save();

    return response()->json($workout);
  }
}
