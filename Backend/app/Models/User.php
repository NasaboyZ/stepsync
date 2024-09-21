<?php

namespace App\Models;

use Config\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use WendellAdriel\Lift\Attributes\Hidden;

class User extends Model {
  use HasApiTokens;

  #[Column] #[Hidden]
    public string $first_name;

    #[Column] #[Hidden]
    public string $last_name;

    #[Column]
    public string $email;

    #[Column]
    public string $username;

    #[Column] #[Hidden]
    public string $password;

    #[Column] #[Hidden]
    public float $weight;

    #[Column] #[Hidden]
    public float $height;

    #[Column] #[Hidden]
    public string $goal;

    #[Column] #[Hidden]
    public string $gender;

    #[Column] #[Hidden]
    public string $date_of_birth;



  function comments(): HasMany|Comment {
    return $this->hasMany(Comment::class);
  }
  public function workouts(): HasMany| Workout
    {
        return $this->hasMany(Workout::class);
    }
    public function blogposts(): HasMany {
      return $this->hasMany(Blogpost::class, 'user_id');
  }

  static function validate(Request $request) {
    $post = $request->method() === 'POST';
    return $request->validate([
      'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'password' => [$post ? 'required' : 'sometimes', 'min:8'],
            'weight' => ['required', 'numeric'],
            'height' => ['required', 'numeric'],
            'goal' => ['required', 'string'],
            'gender' => ['required', 'in:male,female,other'],
            'date_of_birth' => ['required', 'date'],
    ]);
  }

  static function booted() {
    self::saving(function (User $user) {
      if ($user->isDirty('password')) {
        $plain = $user->getAttribute('password');
        $user->setAttribute('password', \Hash::make($plain));
      }
    });
  }
}
