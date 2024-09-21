<?php

namespace App\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagsController {
  
  // Alle Tags abrufen
  function index(Request $request) {
    return Tag::all(); // Gibt eine Liste aller Tags zurück
  }

  // Neuen Tag erstellen
  function create(Request $request) {
    $payload = Tag::validate($request); // Validierung der eingehenden Daten
    $tag = Tag::create($payload); // Neuen Tag erstellen
    return $tag; // Gibt den neu erstellten Tag zurück
  }

  // Tags einem Blogpost zuweisen
  function assign(Request $request) {
    $blogpostId = $request->input('blogpost_id'); // Blogpost-ID aus der Anfrage
    $tagIds = $request->input('tag_ids'); // Tag-IDs aus der Anfrage
    $blogpost = \Auth::user()->articles()->findOrFail($blogpostId); // Sucht den Blogpost, der dem aktuellen Benutzer gehört
    $blogpost->tags()->sync($tagIds); // Synchronisiert die Tags mit dem Blogpost
    $blogpost->save(); // Speichert die Änderungen
    return $blogpost->fresh(); // Gibt den aktualisierten Blogpost zurück
  }
}
