<?php

namespace App\Controllers;

use App\Models\BMI;
use App\Models\BmiHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BmiController
{
    // Zeigt die BMI-Daten des authentifizierten Benutzers an
    public function index()
    {
        $user = Auth::user();  // Authentifizierter Benutzer
        $bmi = $user->bmi;  // BMI über die Beziehung laden

        if (!$bmi) {
            return response()->json(['message' => 'No BMI data found'], 404);
        }

        return response()->json([
            'user_id' => $user->id,
            'height' => $bmi->height,
            'weight' => $bmi->weight,
            'bmi' => $bmi->calculateBMI(),  // Berechne den BMI
        ]);
    }

    // Aktualisiert die BMI-Daten des Benutzers
    public function update(Request $request)
    {
        $request->validate([
            'height' => 'required|numeric|min:50|max:250',
            'weight' => 'required|numeric|min:20|max:300',
        ]);

        $user = Auth::user();  // Authentifizierter Benutzer
        $bmi = $user->bmi ?? new BMI();  // Lade den BMI oder erstelle einen neuen

        $bmi->height = $request->input('height');
        $bmi->weight = $request->input('weight');
        $bmi->user_id = $user->id;

        $bmi->save();

        return response()->json([
            'message' => 'BMI updated successfully',
            'bmi' => $bmi->calculateBMI(),
        ]);
    }

    // Löscht die BMI-Daten des Benutzers
    public function destroy()
    {
        $user = Auth::user();
        $bmi = $user->bmi;

        if (!$bmi) {
            return response()->json(['message' => 'No BMI data found to delete'], 404);
        }

        $bmi->delete();

        return response()->json(['message' => 'BMI data deleted successfully']);
    }

    // Zeigt die BMI-Historie des Benutzers an
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
