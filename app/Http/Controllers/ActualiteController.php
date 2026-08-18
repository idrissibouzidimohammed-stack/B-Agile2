<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ActualiteController extends Controller
{
    private $news = [
        [
            'id' => 1,
            'title' => 'B-AGILE déploie sa solution WMS pour un grand leader de la distribution',
            'summary' => 'Retour sur la mise en œuvre réussie du WMS B-AGILE dans la plateforme logistique de Casablanca, réduisant les temps de préparation de commande de 25%.',
            'content' => 'Dans le cadre de son plan de transformation digitale, l\'un des leaders marocains de la distribution a fait confiance à B-AGILE pour le pilotage de sa plateforme logistique centrale. Le déploiement s\'est effectué sur un entrepôt de 15 000 m² abritant plus de 20 000 références. En intégrant le guidage vocal et le scannage RFID, nos équipes ont optimisé les trajets des préparateurs et fiabilisé les expéditions.',
            'date' => '15 Juin 2026',
            'image' => '/images/news1.jpg',
            'tag' => 'WMS & Logistique'
        ],
        [
            'id' => 2,
            'title' => 'Lancement de B-AGILE TMS Mobile v3.0 pour les chauffeurs livreurs',
            'summary' => 'Une application mobile entièrement repensée pour optimiser le suivi des tournées de livraison et la signature électronique des clients (POD).',
            'content' => 'B-AGILE annonce la sortie de la version 3.0 de son application mobile intégrée au TMS. Cette version apporte une navigation GPS intégrée, la gestion hors-ligne améliorée des validations de livraison, la prise de photo en cas de réserve et la signature électronique (Proof of Delivery). Les clients finaux bénéficient désormais d\'un lien de tracking SMS en temps réel.',
            'date' => '02 Mai 2026',
            'image' => '/images/news2.jpg',
            'tag' => 'TMS & Mobilité'
        ],
        [
            'id' => 3,
            'title' => 'B-AGILE présent au salon Logismed 2026 à Casablanca',
            'summary' => 'Retrouvez nos experts au stand B-12 du 12 au 14 mai pour échanger sur la digitalisation de vos entrepôts et de vos flottes de transport.',
            'content' => 'Pour sa nouvelle participation au Salon International du Transport et de la Logistique en Afrique (Logismed), B-AGILE présentera ses dernières innovations en matière d\'intelligence artificielle appliquée à l\'optimisation des tournées et à l\'entreposage dynamique. Des sessions de démonstrations en direct seront organisées chaque jour.',
            'date' => '20 Avril 2026',
            'image' => '/images/news3.jpg',
            'tag' => 'Événement'
        ]
    ];

    public function index()
    {
        return Inertia::render('Actualites/Index', [
            'news' => $this->news
        ]);
    }
}
