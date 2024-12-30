<?php

namespace App\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class UploadsController
{
  function create(Request $request)
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
      $pathname = \Storage::putFileAs(
        'uploads/' . $user->id,
        $file,
        'avatar.jpg'
      );

      if (!$pathname) {
        return response()->json(['error' => 'Fehler beim Speichern der Datei'], 500);
      }

      Image::where('user_id', $user->id)->delete();

      $image = new Image();
      $image->pathname = $pathname;
      $image->user_id = $user->id;
      $image->save();

      return response()->json([
        'message' => 'Avatar erfolgreich hochgeladen',
        'pathname' => $pathname
      ], 201);
    } catch (\Exception $e) {
      if (isset($pathname) && \Storage::exists($pathname)) {
        \Storage::delete($pathname);
      }

      return response()->json([
        'error' => 'Fehler beim Hochladen: ' . $e->getMessage()
      ], 500);
    }
  }

  function destroy(Request $request)
  {
    $user = \Auth::user();
    $filename = $request->input('filename');
    $path = 'uploads/' . $user->id . '/' . $filename;

    Image::where('pathname', $path)->where('user_id', $user->id)->delete();

    if (!\Storage::exists($path))
      return abort(404, 'file does not exist');
    \Storage::delete($path);
    return $path;
  }
}
