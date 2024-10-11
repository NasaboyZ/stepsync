<?php

namespace App\Models;

use Config\Model;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use WendellAdriel\Lift\Attributes\Hidden;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BMI extends Model
{
    use HasApiTokens;
    protected $table = 'b_m_i_s';


    #[Column]
    public float $height;

    #[Column]
    public float $weight;

    #[Column]
    public int $user_id;


    public function calculateBMI(): float
    {
        if ($this->height > 0) {
            return round($this->weight / (($this->height / 100) ** 2), 1);
        }
        return 0;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }



    public static function validate(Request $request): array
    {
        return $request->validate([
            'height' => 'required|numeric|min:0|max:250',
            'weight' => 'required|numeric|min:0|max:300',
        ]);
    }


    protected static function booted()
    {
        // Vor dem Speichern berechnen wir den BMI
        static::saving(function ($model) {
            $model->calculateBMI();
        });
    }
}
