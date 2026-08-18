<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SolutionController extends Controller
{
    private $solutions = [
        'erp' => [
            'slug' => 'erp',
            'title' => 'Enterprise Resource Planning – ERP',
            'short_desc' => 'Le cœur décisionnel de votre entreprise pour planifier et optimiser vos ressources.',
            'desc' => 'Notre solution ERP est conçue pour centraliser et unifier la gestion de l\'ensemble des processus opérationnels de l\'entreprise : finances, achats, ventes, ressources humaines, planification de la production, élevage, etc.',
            'features' => [
                'Gestion financière & Comptabilité analytique',
                'Achats & Ventes (devis, facturation, suivi client)',
                'Gestion des stocks multi-dépôts intégrée',
                'Planification de la production industrielle (GPAO)',
                'Suivi spécifique pour l\'agriculture et l\'élevage'
            ]
        ],
        'wms' => [
            'slug' => 'wms',
            'title' => 'Gestion d\'entrepôt – WMS',
            'short_desc' => 'Maîtrise totale de vos flux de stockage et optimisation de l\'espace.',
            'desc' => 'Le WMS B-AGILE permet de piloter précisément toutes les opérations physiques au sein de vos entrepôts. Il optimise l\'adressage, l\'ordonnancement des préparations de commandes (picking), la réception des marchandises et réduit à néant les écarts d\'inventaire.',
            'features' => [
                'Cartographie 3D / Adressage dynamique des emplacements',
                'Gestion des réceptions & contrôle qualité des marchandises',
                'Algorithmes d\'optimisation de picking (Single, Batch, Zone)',
                'Inventaires tournants sans arrêt de l\'activité',
                'Traçabilité complète (Numéro de lot, DLC, DLUO)'
            ]
        ],
        'tms' => [
            'slug' => 'tms',
            'title' => 'Gestion de transport – TMS',
            'short_desc' => 'Optimisation de vos tournées de livraison et réduction de vos coûts de transport.',
            'desc' => 'Conçu pour les transporteurs, distributeurs et chargeurs, notre TMS pilote l\'intégralité du cycle de distribution : planification automatique de tournées, répartition de charge, gestion de flotte de véhicules, et facturation du transport multimodal.',
            'features' => [
                'Planification & optimisation de tournées sous contraintes',
                'Suivi en temps réel des chauffeurs (Mobile App)',
                'Gestion des coûts de carburant, de péage et d\'entretien',
                'Portail clients pour le suivi de livraison (Track & Trace)',
                'Facturation automatique du transport'
            ]
        ],
        'crm' => [
            'slug' => 'crm',
            'title' => 'Gestion de la relation client – CRM',
            'short_desc' => 'Optimisez vos opportunités commerciales et fidélisez vos clients.',
            'desc' => 'Notre CRM accompagne vos équipes de vente dans la structuration de leur pipeline d\'opportunités. Suivez chaque interaction, automatisez les relances et augmentez significativement vos taux de conversion.',
            'features' => [
                'Gestion complète du portefeuille clients & prospects',
                'Pipeline commercial visuel (Kanban)',
                'Historique des interactions (emails, appels, réunions)',
                'Rapports d\'activité et prévisions de vente en temps réel',
                'Campagnes d\'emailing ciblées'
            ]
        ],
        'gmao' => [
            'slug' => 'gmao',
            'title' => 'Gestion de la maintenance – GMAO',
            'short_desc' => 'Maximisez la disponibilité de vos équipements industriels et matériels.',
            'desc' => 'La solution GMAO planifie vos opérations de maintenance préventive et curative. Suivez l\'historique des pannes, gérez les pièces de rechange et pilotez le planning de vos techniciens sur le terrain.',
            'features' => [
                'Registre complet des actifs & équipements',
                'Gestion des demandes de travaux (curatif)',
                'Planification de la maintenance préventive',
                'Gestion des stocks de pièces détachées',
                'Indicateurs clés : MTBF, MTTR, taux de panne'
            ]
        ],
        'pos' => [
            'slug' => 'pos',
            'title' => 'Gestion des points de vente – POS',
            'short_desc' => 'Gérez vos ventes au comptoir avec rapidité et fiabilité.',
            'desc' => 'Une solution moderne de point de vente qui s\'intègre en temps réel avec votre gestion commerciale et de stock. Idéale pour les magasins physiques, grossistes et comptoirs de vente.',
            'features' => [
                'Interface tactile ultra-rapide (Caisse enregistreuse)',
                'Multi-moyens de paiement (espèces, carte, chèque, crédit)',
                'Synchronisation immédiate des stocks centraux',
                'Gestion des tickets de caisse & retours clients',
                'Fidélisation clients et promotions'
            ]
        ],
        'ecom' => [
            'slug' => 'ecom',
            'title' => 'Gestion du commerce en ligne – E-COM',
            'short_desc' => 'Ouvrez votre canal de vente en ligne et connectez-le à vos stocks.',
            'desc' => 'Nous connectons votre boutique e-commerce avec notre ERP/WMS. Les commandes en ligne descendent automatiquement en préparation dans l\'entrepôt et les niveaux de stock se synchronisent automatiquement.',
            'features' => [
                'Boutiques B2C & portails de commande B2B',
                'Passerelles de paiement sécurisées intégrées',
                'Synchronisation temps réel du catalogue articles',
                'Descente automatique des commandes en WMS pour picking',
                'Suivi du statut de livraison pour le client final'
            ]
        ],
        'education' => [
            'slug' => 'education',
            'title' => 'Offre pédagogique de formation',
            'short_desc' => 'Formez vos équipes et vos partenaires aux outils Supply Chain de demain.',
            'desc' => 'B-AGILE propose des cursus de formation sur-mesure pour les écoles d\'ingénieurs, les centres de formation logistique et les professionnels de la Supply Chain souhaitant monter en compétences sur nos outils.',
            'features' => [
                'Ateliers pratiques de mise en situation en entrepôt',
                'Modules théoriques sur la gestion des flux',
                'Certifications officielles B-AGILE',
                'Matériel didactique et simulateurs de flux'
            ]
        ]
    ];

    public function index()
    {
        return Inertia::render('Solutions/Index', [
            'solutions' => array_values($this->solutions)
        ]);
    }

    public function show($slug)
    {
        if (!isset($this->solutions[$slug])) {
            abort(404);
        }

        return Inertia::render('Solutions/Show', [
            'solution' => $this->solutions[$slug]
        ]);
    }
}
