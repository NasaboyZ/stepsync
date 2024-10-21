<?php

namespace App\Models;

use Config\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use WendellAdriel\Lift\Attributes\Hidden;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

class User extends Model
{
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

  #[Column] #[Hidden]
  public string $verfication_token;

  #[Column] #[Hidden]
  public string $email_verified;


  function comments(): HasMany|Comment
  {
    return $this->hasMany(Comment::class);
  }
  public function workouts(): HasMany| Workout
  {
    return $this->hasMany(Workout::class);
  }
  public function blogposts(): HasMany
  {
    return $this->hasMany(Blogpost::class, 'user_id');
  }
  public function bmi(): HasOne
  {
    return $this->hasOne(BMI::class, 'user_id');
  }
  public function challenges()
  {
    return $this->belongsToMany(Challenges::class, 'challenge_user', 'user_id', 'challenge_id');
  }





  static function validate(Request $request)
  {
    $post = $request->method() === 'POST';
    return $request->validate([
      'first_name' => [$post ? 'required' : 'sometimes', 'string', 'max:255'],
      'last_name' => [$post ? 'required' : 'sometimes', 'string', 'max:255'],
      'email' => [$post ? 'required' : 'sometimes', 'email', 'unique:users,email'],
      'username' => [$post ? 'required' : 'sometimes', 'string', 'max:255', 'unique:users,username'],
      'password' => [
        $post ? 'required' : 'sometimes',
        'min:8',
        'regex:/[a-z]/',      // Mindestens ein Kleinbuchstabe
        'regex:/[A-Z]/',      // Mindestens ein Großbuchstabe
        'regex:/[0-9]/',      // Mindestens eine Zahl
        'regex:/[@$!%*#?&]/', // Mindestens ein Sonderzeichen
        'not_regex:/\s/'      // Kein Leerzeichen erlaubt
      ],
      'weight' => [$post ? 'required' : 'sometimes', 'numeric'],
      'height' => [$post ? 'required' : 'sometimes', 'numeric'],
      'goal' => [$post ? 'required' : 'required', 'string'],
      'gender' => [$post ? 'required' : 'sometimes', 'in:male,female,other'],
      'date_of_birth' => [$post ? 'required' : 'sometimes', 'date'],
    ]);
  }

  static function booted()
  {
    self::saving(function (User $user) {
      if ($user->isDirty('password')) {
        $plain = $user->getAttribute('password');
        $user->setAttribute('password', \Hash::make($plain));
      }
    });
  }

  // Methode, um einen neuen Verifizierungstoken zu generieren
  public function generateVerificationToken()
  {
    $this->verification_token = Str::random(64); // Token generieren
    $this->save();
  }

  // Methode, um den Benutzer als verifiziert zu markieren
  public function markEmailAsVerified()
  {
    $this->email_verified_at = now();
    $this->verification_token = null; // Token löschen, nachdem die E-Mail verifiziert wurde
    $this->save();
  }

  // Überprüfen, ob der Benutzer verifiziert ist
  public function isVerified(): bool
  {
    return !is_null($this->email_verified_at);
  }
}
