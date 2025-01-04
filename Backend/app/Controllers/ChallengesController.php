<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\Challenges;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChallengesController
{
    // Alle Challenges abrufen (nur für den authentifizierten Benutzer)
    public function index(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $challenges = $user->challenges()->get(); // Nur die Challenges des Benutzers abrufen
        } else {
            $challenges = Challenges::all(); // Für Gäste: Alle Challenges anzeigen
        }

        return response()->json(['challenges' => $challenges]);
    }

    // Neue Challenge erstellen
    public function create(Request $request)
    {
        $user = Auth::user();
        $payload = Challenges::validate($request);

        // Challenge erstellen und dem Benutzer zuweisen
        $challenge = Challenges::create($payload);
        $user->challenges()->attach($challenge->id, ['status' => 'pending']);

        return response()->json(['challenge' => $challenge], 201);
    }

    // Challenge aktualisieren
    public function updateChallenge(Request $request, $id)
    {
        $user = Auth::user();
        $challenge = $user->challenges()->where('challenges.id', $id)->firstOrFail();

        // Wenn nur der Status aktualisiert werden soll
        if ($request->has('status') && count($request->all()) === 1) {
            $payload = $request->validate([
                'status' => ['required', 'string', 'in:done,pending,pass']
            ]);

            // Update sowohl Challenge als auch Pivot-Status
            $challenge->update(['status' => $payload['status']]);
            $user->challenges()->updateExistingPivot($id, ['status' => $payload['status']]);

            return response()->json([
                'message' => 'Challenge status successfully updated',
                'status' => $payload['status']
            ]);
        }

        // Ansonsten normale Challenge-Aktualisierung
        $payload = Challenges::validate($request, false);
        $challenge->update($payload);

        // Wenn ein Status im Payload ist, auch den Pivot-Status aktualisieren
        if (isset($payload['status'])) {
            $user->challenges()->updateExistingPivot($id, ['status' => $payload['status']]);
        }

        return response()->json([
            'message' => 'Challenge successfully updated',
            'challenge' => $challenge
        ]);
    }

    // Challenge löschen
    public function destroy($challengeId)
    {
        $user = Auth::user();
        $challenge = Challenges::findOrFail($challengeId);

        // Überprüfen, ob der Benutzer Zugriff auf diese Challenge hat
        if (!$user->challenges()->where('challenges.id', $challengeId)->exists()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->challenges()->detach($challengeId);
        $challenge->delete(); // Die Challenge selbst auch löschen

        return response()->json(['message' => 'Challenge deleted']);
    }
}
