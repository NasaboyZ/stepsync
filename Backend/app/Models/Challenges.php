<?php

namespace App\Models;

use Config\Model;
use Illuminate\Http\Request;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Challenges extends Model
{
    #[Column]
    public string $title;

    #[Column]
    public string $description;

    #[Column]
    public string $goal;

    #[Column]
    public bool $status; // Boolean field for status

    #[Column]
    public  $start_date;

    #[Column]
    public  $end_date;

    // Casts to ensure fields are handled as the proper data type
    protected $casts = [
        'status' => 'boolean', // Ensure status is always treated as a boolean
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    // Relationship: many-to-many with users
    public function users()
    {
        return $this->belongsToMany(User::class, 'challenge_user', 'challenge_id', 'user_id');
    }

    // Challenge validation
    static function validate(Request $request)
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'goal' => ['required', 'string'],
            'status' => ['required', 'boolean'], // Validates status as a boolean
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
        ]);
    }
}
