<?php

namespace App\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ImageController
{
    public function show()
    {
        $user = Auth::user();

        if ($user->avatar) {
            return response()->json([
                'path' => Storage::url($user->avatar->path)
            ]);
        }

        return response()->json(['path' => null], 404);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $user = Auth::user();
        $file = $request->file('file');
        $uniqueFilename = uniqid() . '.' . $file->getClientOriginalExtension();

        // Neues Avatar speichern
        $userPath = 'uploads/' . $user->id;

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar->path);
            $user->avatar->delete();
        }

        $path = Storage::disk('public')->putFileAs($userPath, $file, $uniqueFilename);

        $image = new Image([
            'path' => $path,
            'user_id' => $user->id
        ]);

        $image->save();

        return response()->json([
            'message' => 'Avatar erfolgreich hochgeladen',
            'path' => Storage::url($path)
        ]);
    }

    public function destroy()
    {
        $user = Auth::user();

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar->path);
            $user->avatar->delete();
            return response()->json(['message' => 'Avatar erfolgreich gelöscht']);
        }

        return response()->json(['message' => 'Kein Avatar vorhanden'], 404);
    }
}
