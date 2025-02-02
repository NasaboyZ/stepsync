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
    public string $title;

    #[Column]
    public string $description;

    #[Column]
    public ?int $weight;

    #[Column]
    public ?int $repetitions;

    #[Column]
    public ?float $distance;

    #[Column]
    public ?string $distance_unit;

    #[Column]
    public int $user_id;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    static function validate(Request $request)
    {
        $rules = [
            'category' => 'required|string|in:cardio,krafttraining',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'weight' => 'nullable|integer|min:0',
            'repetitions' => 'required|integer|min:0',
            'distance' => 'nullable|numeric|min:0',
            'distance_unit' => 'nullable|string|in:meter,kilometer',
        ];

        return $request->validate($rules);
    }
}
