<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'entreprise' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:30',
            'sujet' => 'required|string|max:100',
            'message' => 'required|string|max:5000',
        ]);

        // Log the message contents to the laravel log file
        Log::info('Nouveau message de contact B-AGILE :', $validated);

        // Redirect back with success message
        return redirect()->back()->with('success', 'Votre message a bien été envoyé !');
    }
}
