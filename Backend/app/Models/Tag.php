<?php

namespace App\Models;

use Config\Model;
use Illuminate\Http\Request;
use WendellAdriel\Lift\Attributes\Column;

class Tag extends Model {
  #[Column]
  public string $name;

  static function validate(Request $request) {
    return $request->validate([
      'name' => ['required', "min:1", "max:99", 'unique:tags,name'],
    ]);
  }
}
