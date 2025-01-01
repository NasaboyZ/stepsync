<?php

namespace App\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class UploadsController
{
  public function index(Request $request)
  {
    $user = \Auth::user();
    $images = Image::where('user_id', $user->id)->get();

    return response()->json([
      'images' => $images
    ]);
  }

  public function create(Request $request)
  {
    $user = \Auth::user();
    $request->validate([
      'file' => ['required', 'image', 'max:2048']
    ]);

    $file = $request->file('file');
    if (!$file) {
      return response()->json(['error' => 'Keine Datei gefunden'], 400);
    }

    try {
      \Log::info('Upload für User:', ['user_id' => $user->id]);

      // Speichern des Bildes im Storage
      $pathname = \Storage::putFileAs(
        'uploads/' . $user->id,
        $file,
        'avatar.jpg'
      );

      if (!$pathname) {
        return response()->json(['error' => 'Fehler beim Speichern der Datei'], 500);
      }

      // Löschen des alten Avatar-Bildes, falls vorhanden
      Image::where('user_id', $user->id)->delete();

      // Erstellen des neuen Bildeintrags in der Datenbank
      $image = Image::create([
        'pathname' => $pathname,
        'user_id' => $user->id
      ]);

      \Log::info('Gespeichertes Bild:', ['image' => $image->toArray()]);

      return response()->json([
        'message' => 'Avatar erfolgreich hochgeladen',
        'pathname' => $pathname,
        'image' => $image,
        'url' => \Storage::url($pathname)
      ], 201);
    } catch (\Exception $e) {
      \Log::error('Upload Fehler:', ['error' => $e->getMessage()]);

      // Aufräumen bei Fehler
      if (isset($pathname) && \Storage::exists($pathname)) {
        \Storage::delete($pathname);
      }

      return response()->json([
        'error' => 'Fehler beim Hochladen: ' . $e->getMessage()
      ], 500);
    }
  }

  public function destroy($id)
  {
    try {
      $user = \Auth::user();
      $image = Image::where('id', $id)
        ->where('user_id', $user->id)
        ->firstOrFail();

      // Datei aus dem Storage löschen
      if (\Storage::exists($image->pathname)) {
        \Storage::delete($image->pathname);
      }

      // Datenbankeintrag löschen
      $image->delete();

      return response()->json([
        'message' => 'Bild erfolgreich gelöscht'
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'error' => 'Fehler beim Löschen des Bildes: ' . $e->getMessage()
      ], 500);
    }
  }
}
