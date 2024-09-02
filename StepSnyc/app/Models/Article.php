<?php

namespace App\Models;

use Config\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use WendellAdriel\Lift\Attributes\Column;

class Article extends Model {
  #[Column]
  public string $title;

  #[Column]
  public string $content;

  #[Column]
  public int $user_id;

  function tags(): BelongsToMany|Tag {
    return $this->belongsToMany(Tag::class);
  }

  protected $with = ['tags'];

  static function validate(Request $request) {
    $post = $request->method() === 'POST';
    return $request->validate([
      'title' => [$post ? 'required' : 'sometimes', "min:1", "max:200"],
      'content' => [$post ? 'required' : 'sometimes', 'min:1', "max:20000"],
    ]);
  }
}
