<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Demande;
use App\Models\DemandeResponse;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create client user
        $client = User::create([
            'name' => 'Jean Client',
            'email' => 'client@bagile.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // 2. Create team/enterprise user
        $team = User::create([
            'name' => 'Sophie Admin (B-AGILE)',
            'email' => 'team@bagile.com',
            'password' => Hash::make('password'),
            'role' => 'team',
        ]);

        // 3. Create requests & discussions
        
        // Demande 1: API WMS (En cours)
        $demande1 = Demande::create([
            'user_id' => $client->id,
            'title' => "Problème d'accès à l'API WMS",
            'description' => "Bonjour, je n'arrive pas à connecter nos douchettes de picking à la nouvelle version de l'API WMS. Le serveur renvoie une erreur 403 à chaque requête d'authentification.",
            'category' => 'WMS',
            'priority' => 'Haute',
            'status' => 'En cours',
        ]);

        DemandeResponse::create([
            'demande_id' => $demande1->id,
            'user_id' => $client->id,
            'message' => "J'ai pourtant bien renseigné l'identifiant et la clé secrète générée depuis l'admin.",
        ]);

        DemandeResponse::create([
            'demande_id' => $demande1->id,
            'user_id' => $team->id,
            'message' => "Bonjour Jean. Nous venons de vérifier vos logs. Votre clé API n'a pas les droits d'écriture activés pour l'entrepôt principal. Nous venons de modifier les permissions, pouvez-vous réessayer ?",
        ]);

        // Demande 2: Intégration GMAO (En attente)
        Demande::create([
            'user_id' => $client->id,
            'title' => "Intégration et démo du module GMAO",
            'description' => "Nous souhaitons activer le module GMAO pour la maintenance préventive de notre parc de machines. Serait-il possible de planifier une séance de démo et d'assistance pour le déploiement ?",
            'category' => 'GMAO',
            'priority' => 'Moyenne',
            'status' => 'En attente',
        ]);

        // Demande 3: POS bug (Résolue)
        $demande3 = Demande::create([
            'user_id' => $client->id,
            'title' => "Bug d'impression ticket POS",
            'description' => "Bonjour, sur notre point de vente (POS), le bouton d'impression directe du ticket de caisse reste grisé après validation du paiement en espèces.",
            'category' => 'POS',
            'priority' => 'Haute',
            'status' => 'Résolue',
        ]);

        DemandeResponse::create([
            'demande_id' => $demande3->id,
            'user_id' => $team->id,
            'message' => "Bonjour Jean. C'est un bug identifié sur la version 1.4.2 du POS lors de paiements spécifiques. Nous venons de publier un correctif (v1.4.3) sur votre environnement. Pouvez-vous vider le cache de votre navigateur et faire un test ?",
        ]);

        DemandeResponse::create([
            'demande_id' => $demande3->id,
            'user_id' => $client->id,
            'message' => "C'est parfait ! L'impression fonctionne à nouveau très bien. Merci pour la réactivité de l'équipe !",
        ]);
    }
}
