<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\Challenges;
use Illuminate\Http\Request;

class ChallengesController
{

    // Alle Challenges abrufen
    public function index(Request $request)
    {
        return Challenges::all(); // Gibt alle Herausforderungen zurück
    }

    // Neue Challenge erstellen
    public function create(Request $request)
    {
        $payload = Challenges::validate($request); // Validierung der eingehenden Daten
        $challenge = Challenges::create($payload); // Neue Challenge erstellen
        return $challenge; // Gibt die neu erstellte Challenge zurück
    }

    // Zufällige Challenges einem Benutzer zuweisen
    public function assignRandomChallengesToUser(User $user)
    {
        $numberOfChallenges = 3; // Anzahl zufälliger Challenges

        // Zufällig ausgewählte Challenges aus der Datenbank abrufen
        $challenges = Challenges::inRandomOrder()->take($numberOfChallenges)->get();

        // Zuweisung der Challenges an den Benutzer
        $user->challenges()->attach($challenges->pluck('id'));

        return $user->fresh('challenges'); // Gibt die aktualisierten Challenges zurück
    }

    // Status einer Challenge (Done oder Pass) aktualisieren
    public function updateChallengeStatus(Request $request)
    {
        $userId = $request->input('user_id');
        $challengeId = $request->input('challenge_id');
        $status = $request->input('status'); // "done" oder "pass"

        // Finde den Benutzer und die Challenge
        $user = User::findOrFail($userId);

        // Update der Challenge-Status in der Pivot-Tabelle
        $user->challenges()->updateExistingPivot($challengeId, ['status' => $status]);

        return response()->json([
            'message' => 'Challenge status updated',
            'status' => $status
        ]);
    }

    // Bestimmte Challenges einem Benutzer zuweisen
    public function assign(Request $request)
    {
        $userId = $request->input('user_id'); // Benutzer-ID aus der Anfrage
        $challengeIds = $request->input('challenge_id'); // Challenge-IDs aus der Anfrage

        // Sucht den Benutzer anhand der ID
        $user = User::findOrFail($userId);

        // Synchronisiere die Challenges mit dem Benutzer
        $user->challenges()->sync($challengeIds);

        return response()->json([
            'message' => 'Challenges assigned successfully',
            'user' => $user->fresh('challenges') // Gibt die aktualisierten Herausforderungen zurück
        ]);
    }

    // Challenge ablehnen und neue zuweisen
    // Challenge ablehnen und neue zuweisen
    public function rejectChallenge($challengeId, Request $request)
    {
        $userId = $request->input('user_id');

        // Finde den Benutzer
        $user = User::findOrFail($userId);

        // Entferne die abgelehnte Challenge
        $user->challenges()->detach($challengeId);

        // Weise eine neue zufällige Challenge zu
        $newChallenge = Challenges::inRandomOrder()->first();
        $user->challenges()->attach($newChallenge->id);

        return response()->json([
            'message' => 'Challenge rejected and new challenge assigned',
            'new_challenge' => $newChallenge
        ]);
    }

    // Eigene Challenges eines Benutzers abrufen
    public function getUserChallenges($userId)
    {
        $user = User::findOrFail($userId); // Finde den Benutzer

        // Gibt alle Challenges des Benutzers zurück
        return $user->challenges()->get();
    }
}
