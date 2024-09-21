<?php

namespace App\Controllers;

use App\Models\Blogpost;
use Illuminate\Http\Request;

class BlogpostsController {
  
  // Index Methode zum Abrufen von Blogposts basierend auf Filter- und Sortierkriterien
  function index(Request $request) {
    $query = Blogpost::query();

    // Filter nach ID
    $id = $request->input('id');
    if ($id) $query->where('id', $id);

    // Filter nach Benutzer
    $userId = $request->input('user_id');
    if ($userId) $query->where('user_id', $userId);

    // Filter nach Tags
    $tagIds = $request->input('tag_ids');
    $isGrouped = $request->input('is_grouped');
    if ($tagIds) {
      $tagIds = explode(',', $tagIds);
      $query->whereHas(
        'tags',
        fn($q) => $q->whereIn('tag_id', $tagIds),
        '>=',
        $isGrouped ? count($tagIds) : 1,
      );
    }

    // Sortierung
    $orderBy = $request->input('order_by', 'created_at');
    $orderDir = $request->input('order_dir', 'desc');
    $query->orderBy($orderBy, $orderDir);

    // Limit und Offset für Pagination
    $limit = $request->input('limit');
    $offset = $request->input('offset');
    if ($limit) $query->limit($limit);
    if ($offset) $query->offset($offset);

    // Rückgabe der Ergebnisse
    return $query->get();
  }

  // Methode zum Erstellen eines Blogposts
  function create(Request $request) {
    $payload = Blogpost::validate($request);
    // Erstelle einen neuen Blogpost für den authentifizierten Benutzer
    $blogpost = \Auth::user()->blogposts()->create($payload);
    return $blogpost;
  }

  // Methode zum Aktualisieren eines bestehenden Blogposts
  function update(Request $request) {
    $id = $request->input('id');
    $payload = Blogpost::validate($request);
    // Finde den Blogpost des authentifizierten Benutzers anhand der ID und aktualisiere ihn
    $blogpost = \Auth::user()->blogposts()->findOrFail($id);
    $blogpost->update($payload);
    return $blogpost;
  }

  // Methode zum Löschen eines Blogposts
  function destroy(Request $request) {
    $id = $request->input('id');
    // Finde den Blogpost des authentifizierten Benutzers anhand der ID und lösche ihn
    $blogpost = \Auth::user()->blogposts()->findOrFail($id);
    $blogpost->delete();
    return $blogpost;
  }
}
