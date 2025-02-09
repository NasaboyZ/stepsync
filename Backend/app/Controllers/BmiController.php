<?php

namespace App\Controllers;

use App\Models\BMI;
use App\Models\BmiHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BmiController
{

    public function index()
    {
        $user = Auth::user();
        $bmi = BMI::where('user_id', $user->id)->first();

        if (!$bmi) {
            return response()->json(['message' => 'No BMI data found'], 404);
        }

        return response()->json([
            'user_id' => $user->id,
            'height' => $bmi->height,
            'weight' => $bmi->weight,
            'bmi' => $bmi->calculateBMI(),
        ]);
    }


    public function update(Request $request)
    {
        $request->validate([
            'height' => 'required|numeric|min:50|max:250',
            'weight' => 'required|numeric|min:20|max:300',
        ]);

        $user = Auth::user();
        $bmi = BMI::where('user_id', $user->id)->first() ?? new BMI();

        $bmi->height = $request->input('height');
        $bmi->weight = $request->input('weight');
        $bmi->user_id = $user->id;


        $user->height = $request->input('height');
        $user->weight = $request->input('weight');
        $user->save();

        $bmi->save();

        return response()->json([
            'message' => 'BMI updated successfully',
            'bmi' => $bmi->calculateBMI(),
        ]);
    }


    public function destroy()
    {
        $user = Auth::user();
        $bmi = BMI::where('user_id', $user->id)->first();

        if (!$bmi) {
            return response()->json(['message' => 'No BMI data found to delete'], 404);
        }

        $bmi->delete();

        return response()->json(['message' => 'BMI data deleted successfully']);
    }


    public function history()
    {
        $user = Auth::user();
        $history = BmiHistory::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'history' => $history
        ]);
    }
}
