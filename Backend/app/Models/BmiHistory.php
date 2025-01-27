<?php

namespace App\Models;

use Config\Model;
use WendellAdriel\Lift\Attributes\Column;

class BmiHistory extends Model
{
    protected $table = 'bmi_history';

    #[Column]
    public float $height;

    #[Column]
    public float $weight;

    #[Column]
    public float $bmi_value;

    #[Column]
    public int $user_id;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
