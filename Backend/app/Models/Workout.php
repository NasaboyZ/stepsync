<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Config\Model;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class Workout extends Model
{
    #[Column]
    public string $category;

    #[Column]
    public string $description;

    #[Column]
    public int $weight;

    #[Column]
    public int $repetitions;

    #[Column]
    public int $user_id;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    static function validate(Request $request) {
        return $request->validate([
            'category' => 'required|in:cardio,lifting',
            'description' => 'required|string',
            'weight' => 'nullable|integer',
            'repetitions' => 'nullable|integer',
            // 'user_id' => 'required|exists:users,id',
        
        ]);
    }
}
