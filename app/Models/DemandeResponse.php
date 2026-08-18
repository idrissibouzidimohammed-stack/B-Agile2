<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['demande_id', 'user_id', 'message'])]
class DemandeResponse extends Model
{
    /**
     * Get the demande associated with this response.
     */
    public function demande()
    {
        return $this->belongsTo(Demande::class);
    }

    /**
     * Get the user who authored this response.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
