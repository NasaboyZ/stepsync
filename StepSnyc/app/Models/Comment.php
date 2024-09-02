<?php

namespace App\Models;

use Config\Model;
use Illuminate\Http\Request;
use WendellAdriel\Lift\Attributes\Column;

class Comment extends Model {
  #[Column]
  public string $text;

  #[Column]
  public int $article_id;

  #[Column]
  public int $user_id;

  static function validate(Request $request) {
    $post = $request->method() === 'POST';
    return $request->validate([
      'text' => ['required', 'min:3', 'max: 200'],
      'article_id' => [$post ? 'required' : 'exclude', 'exists:articles,id'],
    ]);
  }
}
