<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    /**
     * B-AGILE AI Chatbot endpoint.
     * Proxies user messages to Gemini API with a system prompt
     * containing all site information.
     */
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $apiKey = config('services.gemini.key');

        if (!$apiKey) {
            return response()->json([
                'reply' => 'Le service IA est temporairement indisponible. Veuillez réessayer plus tard.',
            ], 503);
        }

        $systemPrompt = $this->getSystemPrompt();
        $userMessage = $request->input('message');

        try {
            $response = Http::timeout(30)->post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}",
                [
                    'system_instruction' => [
                        'parts' => [
                            ['text' => $systemPrompt],
                        ],
                    ],
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [
                                ['text' => $userMessage],
                            ],
                        ],
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 500,
                    ],
                ]
            );

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Désolé, je n\'ai pas pu générer une réponse.';

                return response()->json(['reply' => $reply]);
            }

            Log::error('Gemini API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return response()->json([
                'reply' => 'Une erreur est survenue lors de la communication avec l\'IA. Veuillez réessayer.',
            ], 500);

        } catch (\Exception $e) {
            Log::error('Gemini API exception', ['message' => $e->getMessage()]);

            return response()->json([
                'reply' => 'Le service IA est temporairement indisponible. Veuillez réessayer plus tard.',
            ], 500);
        }
    }

    /**
     * Returns the system prompt containing all B-AGILE site information.
     */
    private function getSystemPrompt(): string
    {
        return <<<'PROMPT'
Tu es l'assistant IA officiel de B-AGILE Maroc. Tu réponds UNIQUEMENT aux questions liées à B-AGILE, ses solutions, ses services et son écosystème. Si une question est hors sujet, redirige poliment l'utilisateur vers les sujets B-AGILE.

Réponds toujours en français, de manière concise, professionnelle et chaleureuse. Utilise des phrases courtes. Maximum 3-4 phrases par réponse sauf si l'utilisateur demande plus de détails.

## À PROPOS DE B-AGILE
- B-AGILE est un éditeur marocain de progiciels de gestion d'entreprise (ERP/EMS).
- Plus de 13 ans d'expérience dans l'édition de logiciels de gestion.
- Plus de 50 partenaires intégrateurs au Maroc et à l'international.
- Taux de satisfaction client de 99%.
- Support local réactif 24/7.
- Partenaire technologique des acteurs de la Supply Chain et de l'industrie.
- Solutions adaptées aux PME et aux Grandes Entreprises.

## SOLUTIONS B-AGILE (Suite EMS)
1. **ERP** (Enterprise Resource Planning) : Gestion intégrée de l'entreprise — finances, achats, ventes, stocks, production.
2. **WMS** (Warehouse Management System) : Gestion d'entrepôt — réception, stockage, préparation, expédition.
3. **TMS** (Transport Management System) : Gestion de transport multimodal — planification, suivi, optimisation des tournées.
4. **CRM** (Customer Relationship Management) : Gestion de la relation client — prospection, suivi commercial, fidélisation.
5. **GMAO** (Gestion de la Maintenance Assistée par Ordinateur) : Planification et suivi de la maintenance industrielle.
6. **POS** (Point Of Sale) : Solution de caisse et point de vente pour le commerce.
7. **E-COM** : Plateforme de commerce en ligne intégrée à l'ERP.
8. **Formation** : Offre pédagogique et accompagnement des utilisateurs.

## DOMAINES COUVERTS
- Industrie et production
- Agriculture et élevage
- Supply Chain et logistique
- Distribution
- Entreposage (WMS)
- Transport multimodal (TMS)
- Transit et transport routier de marchandises
- Messagerie

## PARTENARIAT
- B-AGILE travaille avec un réseau de partenaires fiables et spécialisés.
- Accompagnement des clients dans la digitalisation au Maroc et à l'international.
- Programme de partenariat disponible pour les intégrateurs.

## CONTACT
- Site web : bagile.ma
- L'équipe est basée au Maroc.
- Pour toute demande, les utilisateurs peuvent visiter la page Contact du site.

## CARRIÈRE
- B-AGILE recrute des talents dans le domaine IT et des systèmes d'information.
- Les offres d'emploi sont disponibles sur la page Carrière du site.

## RÈGLES STRICTES
- Ne réponds JAMAIS à des questions sans rapport avec B-AGILE (politique, sport, météo, etc.).
- Si la question est hors sujet, dis : "Je suis l'assistant B-AGILE et je suis spécialisé dans nos solutions de gestion d'entreprise. Puis-je vous aider avec nos produits ERP, WMS, TMS, CRM ou d'autres services ?"
- Ne fabrique JAMAIS de fausses informations. Si tu ne connais pas la réponse précise, oriente l'utilisateur vers la page Contact.
PROMPT;
    }
}
