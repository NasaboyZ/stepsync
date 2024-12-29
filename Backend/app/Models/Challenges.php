<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Challenges extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'goal', 'status', 'start_date', 'end_date'];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'challenge_user', 'challenge_id', 'user_id')
            ->withPivot('status')
            ->withTimestamps();
    }

    public static function validate(Request $request, $isPost = true)
    {
        if ($request->has('status') && count($request->all()) === 1) {
            return $request->validate([
                'status' => ['required', 'string', 'in:done,pending,pass']
            ]);
        }

        return $request->validate([
            'title' => [$isPost ? 'required' : 'sometimes', 'string', 'max:255'],
            'description' => [$isPost ? 'required' : 'sometimes', 'string'],
            'goal' => [$isPost ? 'required' : 'sometimes', 'string'],
            'status' => [$isPost ? 'required' : 'sometimes', 'string', 'in:done,pending,pass'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
        ]);
    }
}
