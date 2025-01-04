<?php

namespace App\Models;

use Config\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use WendellAdriel\Lift\Attributes\Column;
use WendellAdriel\Lift\Attributes\Hidden;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

class User extends Model
{
  use HasApiTokens;

  #[Column]
  #[Hidden]
  public string $first_name;

  #[Column]
  #[Hidden]
  public string $last_name;

  #[Column]
  public string $email;

  #[Column]
  public string $username;

  #[Column]
  #[Hidden]
  public string $password;

  #[Column]
  #[Hidden]
  public float $weight;

  #[Column]
  #[Hidden]
  public float $height;

  #[Column]
  #[Hidden]
  public string $goal;

  #[Column]
  #[Hidden]
  public string $gender;

  #[Column]
  #[Hidden]
  public string $date_of_birth;

  #[Column]
  #[Hidden]
  public string $verification_token;

  #[Column]
  #[Hidden]
  public string $email_verified;

  public function comments(): HasMany
  {
    return $this->hasMany(Comment::class);
  }

  public function workouts(): HasMany
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
  public function image(): HasMany
  {
    return $this->hasMany(Image::class, 'user_id');
  }
  // Beziehung zu Challenges mit Pivot-Informationen
  public function challenges(): BelongsToMany
  {
    return $this->belongsToMany(Challenges::class, 'challenge_user', 'user_id', 'challenge_id')
      ->withPivot('status') // Zusätzliche Pivot-Daten
      ->withTimestamps();  // Timestamps für die Pivot-Tabelle
  }

  // Abrufen aktiver Challenges
  public function activeChallenges(): BelongsToMany
  {
    return $this->challenges()->wherePivot('status', 'pending');
  }

  public function avatar()
  {
    return $this->belongsTo(Image::class, 'avatar_image_id');
  }

  public static function validate(Request $request)
  {
    $post = $request->method() === 'POST';
    // user mit geben ? 

    return $request->validate([
      'first_name' => [$post ? 'required' : 'sometimes', 'string', 'max:255'],
      'last_name' => [$post ? 'required' : 'sometimes', 'string', 'max:255'],
      'email' => [$post ? 'required' : 'sometimes', 'email', 'unique:users,email'],
      'username' => [$post ? 'required' : 'sometimes', 'string', 'max:255', 'unique:users,username'],
      'password' => [
        $post ? 'required' : 'sometimes',
        'min:8',
        'regex:/[a-z]/',
        'regex:/[A-Z]/',
        'regex:/[0-9]/',
        'regex:/[@$!%*#?&]/',
        'not_regex:/\s/'
      ],
      'weight' => [$post ? 'required' : 'sometimes', 'numeric'],
      'height' => [$post ? 'required' : 'sometimes', 'numeric'],
      'goal' => [$post ? 'required' : 'required', 'string'],
      'gender' => [$post ? 'required' : 'sometimes', 'in:male,female,other'],
      'date_of_birth' => [$post ? 'required' : 'sometimes', 'date'],
    ]);
  }

  protected static function booted()
  {
    self::saving(function (User $user) {
      if ($user->isDirty('password')) {
        $plain = $user->getAttribute('password');
        $user->setAttribute('password', \Hash::make($plain));
      }
    });
  }

  public function generateVerificationToken()
  {
    $this->verification_token = Str::random(64);
    $this->save();
  }

  public function markEmailAsVerified()
  {
    $this->email_verified_at = now();
    $this->verification_token = null;
    $this->save();
  }

  public function isVerified(): bool
  {
    return !is_null($this->email_verified_at);
  }
}
