<?php

namespace App\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class WorkoutsController
{


  function index(Request $request)
  {
    return \Auth::user()->workouts()->get();
  }

  function create(Request $request)
  {
    $payload = Workout::validate($request);


    $payload['is_completed'] = false;
    $payload['completed_at'] = null;

   
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


    if (isset($payload['category']) && $payload['category'] !== $workout->category) {
      if ($payload['category'] === 'cardio') {
        $payload['weight'] = null;
      } else if ($payload['category'] === 'krafttraining') {
        $payload['distance'] = null;
        $payload['distance_unit'] = null;
      }
    }


    if (isset($payload['is_completed'])) {
      $payload['completed_at'] = $payload['is_completed'] ? now() : null;
    }

    $workout->update($payload);
    return $workout;
  }


  function destroy(Request $request)
  {
    $workout = \Auth::user()->workouts()->findOrFail($request->input("id"));
    $workout->delete();
    return response()->json(['message' => 'Workout deleted successfully']);
  }

 
  public function getStatistics(Request $request)
  {
    $user = \Auth::user();
    $timeframe = $request->query('timeframe', '12_months');
    $category = $request->query('category', 'all');

    $query = $user->workouts()
      ->where('is_completed', true)
      ->where('completed_at', '!=', null);


    if ($category !== 'all') {
      $query->where('category', $category);
    }


    switch ($timeframe) {
      case '7_days':
        $query->where('completed_at', '>=', now()->subDays(6))
          ->select(
            DB::raw("strftime('%w', completed_at) as day_num"),
            DB::raw('COUNT(*) as frequency')
          )
          ->groupBy(DB::raw("strftime('%w', completed_at)"))
          ->orderBy('day_num', 'ASC');
        break;

      case '12_months':
        $query->where('completed_at', '>=', now()->subMonths(11))
          ->select(
            DB::raw("strftime('%m', completed_at) as month_num"),
            DB::raw('COUNT(*) as frequency')
          )
          ->groupBy(DB::raw("strftime('%m', completed_at)"))
          ->orderBy('month_num', 'ASC');
        break;

      case '5_years':
        $query->where('completed_at', '>=', now()->subYears(4))
          ->select(
            DB::raw("strftime('%Y', completed_at) as date"),
            DB::raw('COUNT(*) as frequency')
          )
          ->groupBy(DB::raw("strftime('%Y', completed_at)"))
          ->orderBy('date', 'ASC');
        break;
    }

    $statistics = $query->get();

 
    $filledData = $this->fillMissingDataPoints($statistics, $timeframe);

    return response()->json($filledData);
  }


  private function fillMissingDataPoints($statistics, $timeframe)
  {
    $filledData = [];

    switch ($timeframe) {
      case '7_days':
        $dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        for ($i = 0; $i < 7; $i++) {
          $found = $statistics->firstWhere('day_num', $i);
          $filledData[] = [
            'date' => $dayNames[$i],
            'frequency' => $found ? $found->frequency : 0
          ];
        }
        break;

      case '12_months':
        $monthNames = [
          'Jan',
          'Feb',
          'Mär',
          'Apr',
          'Mai',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Okt',
          'Nov',
          'Dez'
        ];
        for ($i = 1; $i <= 12; $i++) {
          $monthNum = str_pad($i, 2, '0', STR_PAD_LEFT);
          $found = $statistics->firstWhere('month_num', $monthNum);
          $filledData[] = [
            'date' => $monthNames[$i - 1],
            'frequency' => $found ? $found->frequency : 0
          ];
        }
        break;

      case '5_years':
        $currentYear = now()->year;
        for ($i = 4; $i >= 0; $i--) {
          $year = $currentYear - $i;
          $found = $statistics->firstWhere('date', (string)$year);
          $filledData[] = [
            'date' => (string)$year,
            'frequency' => $found ? $found->frequency : 0
          ];
        }
        break;
    }

    return $filledData;
  }

  public function updateStatus(Request $request, $id)
  {
    $workout = \Auth::user()->workouts()->findOrFail($id);
    $workout->is_completed = $request->input('is_completed', false);
    $workout->completed_at = $workout->is_completed ? now() : null;
    $workout->save();

    return response()->json($workout);
  }
}
