<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Demande;
use App\Models\DemandeResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DemandeController extends Controller
{
    /**
     * Display the dashboard page with requests based on the user's role.
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->role === 'team') {
            // Team sees all requests with their authors and responses
            $demandes = Demande::with(['user', 'responses.user'])
                ->latest()
                ->get();

            return Inertia::render('Demandes/TeamDashboard', [
                'demandes' => $demandes
            ]);
        }

        // Client sees only their own requests
        $demandes = Demande::where('user_id', $user->id)
            ->with(['responses.user'])
            ->latest()
            ->get();

        return Inertia::render('Demandes/ClientDashboard', [
            'demandes' => $demandes
        ]);
    }

    /**
     * Store a newly created request in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'priority' => 'required|string|in:Basse,Moyenne,Haute',
        ]);

        Demande::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'priority' => $request->priority,
            'status' => 'En attente',
        ]);

        return redirect()->back()->with('success', 'Votre demande a bien été soumise.');
    }

    /**
     * Update the status of a request (Team only).
     */
    public function updateStatus(Request $request, Demande $demande)
    {
        if (auth()->user()->role !== 'team') {
            abort(403, 'Action non autorisée.');
        }

        $request->validate([
            'status' => 'required|string|in:En attente,En cours,Résolue,Rejetée',
        ]);

        $demande->update([
            'status' => $request->status
        ]);

        // Add an automated system message in the chat
        DemandeResponse::create([
            'demande_id' => $demande->id,
            'user_id' => auth()->id(),
            'message' => "💡 Statut changé à : [{$request->status}] par l'équipe support.",
        ]);

        return redirect()->back()->with('success', 'Le statut a été mis à jour.');
    }

    /**
     * Store a comment/response on a request.
     */
    public function storeResponse(Request $request, Demande $demande)
    {
        // Check if user is the request owner or a team member
        if (auth()->id() !== $demande->user_id && auth()->user()->role !== 'team') {
            abort(403, 'Action non autorisée.');
        }

        $request->validate([
            'message' => 'required|string',
        ]);

        DemandeResponse::create([
            'demande_id' => $demande->id,
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        return redirect()->back()->with('success', 'Votre message a bien été envoyé.');
    }

    /**
     * Frictionless 1-click switcher to toggle user role accounts for testing.
     */
    public function switchSpace(Request $request)
    {
        $currentUser = auth()->user();

        if (!$currentUser) {
            // If not logged in, log in as client by default
            $targetUser = User::where('email', 'client@bagile.com')->first();
        } elseif ($currentUser->role === 'team') {
            // Switch to client
            $targetUser = User::where('email', 'client@bagile.com')->first();
        } else {
            // Switch to team
            $targetUser = User::where('email', 'team@bagile.com')->first();
        }

        if ($targetUser) {
            auth()->login($targetUser);
            $request->session()->regenerate();
        }

        return redirect()->route('dashboard');
    }
}
