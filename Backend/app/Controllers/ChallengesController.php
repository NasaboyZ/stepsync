<?php

namespace App\Controllers;

use App\Models\User;
use App\Models\Challenges;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChallengesController
{

    public function index(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $challenges = $user->challenges()->get();
        } else {
            $challenges = Challenges::all();
        }

        return response()->json(['challenges' => $challenges]);
    }


    public function create(Request $request)
    {
        $user = Auth::user();
        $payload = Challenges::validate($request);

        $challenge = Challenges::create($payload);
        $user->challenges()->attach($challenge->id, ['status' => 'pending']);

        return response()->json(['challenge' => $challenge], 201);
    }


    public function updateChallenge(Request $request, $id)
    {
        $user = Auth::user();
        $challenge = Challenges::findOrFail($id);

        $hasAccess = $user->challenges()->where('challenges.id', $id)->exists();
        if (!$hasAccess) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->has('status') && count($request->all()) === 1) {
            $payload = $request->validate([
                'status' => ['required', 'string', 'in:done,pending,pass']
            ]);

            $challenge->update(['status' => $payload['status']]);
            $user->challenges()->updateExistingPivot($id, ['status' => $payload['status']]);

            return response()->json([
                'message' => 'Challenge status successfully updated',
                'status' => $payload['status']
            ]);
        }

        $payload = Challenges::validate($request, false);
        $challenge->update($payload);

        if (isset($payload['status'])) {
            $user->challenges()->updateExistingPivot($id, ['status' => $payload['status']]);
        }

        return response()->json([
            'message' => 'Challenge successfully updated',
            'challenge' => $challenge
        ]);
    }


    public function destroy($challengeId)
    {
        $user = Auth::user();


        $challenge = $user->challenges()
            ->where('challenges.id', $challengeId)
            ->first();

        if (!$challenge) {
            return response()->json(['message' => 'Challenge not found or unauthorized'], 404);
        }

        $user->challenges()->detach($challengeId);
        $challenge->delete();

        return response()->json(['message' => 'Challenge deleted']);
    }
}
