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
    public int $user_id;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    static function validate(Request $request)
    {
        $rules = [
            'category' => 'string|in:cardio,krafttraining',
            'title' => 'string|max:255',
            'description' => 'string',
            'weight' => 'nullable|integer|min:0',
            'repetitions' => 'nullable|integer|min:0',
        ];


        if ($request->isMethod('POST')) {
            $rules['category'] = 'required|' . $rules['category'];
            $rules['title'] = 'required|' . $rules['title'];
            $rules['description'] = 'required|' . $rules['description'];
        }

        // Bei PATCH muss die ID vorhanden sein
        if ($request->isMethod('PATCH')) {
            $rules['id'] = 'required|exists:workouts,id';
        }

        return $request->validate($rules);
    }
}
