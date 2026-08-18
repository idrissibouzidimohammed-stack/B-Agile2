<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'title', 'description', 'category', 'priority', 'status'])]
class Demande extends Model
{
    /**
     * Get the user who created the request.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the responses for this request.
     */
    public function responses()
    {
        return $this->hasMany(DemandeResponse::class)->orderBy('created_at', 'asc');
    }
}
