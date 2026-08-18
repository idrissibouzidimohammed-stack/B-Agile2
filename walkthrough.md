# Walkthrough - Espaces Client & Équipe

J'ai implémenté avec succès les deux espaces distincts de gestion de demandes (Espace Client et Espace Équipe/Entreprise) dans votre application Laravel + React Inertia en local.

---

## 🛠️ Résumé des modifications

### 1. Base de données & Modèles [BACKEND]
- **Utilisateurs :** Ajout de la colonne `role` dans la table `users` pour séparer les clients (`user`) des agents support (`team`).
- **Nouveaux Modèles & Tables :**
  - [Demande](app/Models/Demande.php) / table `demandes` : Stocke le titre, description, catégorie (ERP, WMS, etc.), priorité (Basse, Moyenne, Haute) et le statut (En attente, En cours, Résolue, Rejetée).
  - [DemandeResponse](app/Models/DemandeResponse.php) / table `demande_responses` : Enregistre les réponses/messages de clavardage pour chaque ticket.
- **Seeder :** Mise à jour de [DatabaseSeeder](database/seeders/DatabaseSeeder.php) pour pré-remplir la base avec deux comptes par défaut et quelques demandes factices en cours/résolues.

### 2. Routage & Contrôleur [BACKEND]
- **Routes :** Ajout des routes privées dans [web.php](routes/web.php) pour enregistrer les demandes, modifier le statut, ajouter des messages, et une route `/switch-space` pour le basculement rapide.
- **Contrôleur :** Création de [DemandeController](app/Http/Controllers/DemandeController.php) qui gère intelligemment les données à envoyer à Inertia selon le rôle de l'utilisateur.

### 3. Interface Utilisateur (React) [FRONTEND]
- **Page de Connexion :** [Login.jsx](resources/js/Pages/Auth/Login.jsx) intègre maintenant un panneau **"Connexion Rapide (Mode Démo)"** avec deux boutons : **Espace Client** et **Espace Équipe** pour vous connecter en 1 clic sans devoir saisir manuellement les identifiants.
- **Tableau de Bord Client :** [ClientDashboard.jsx](resources/js/Pages/Demandes/ClientDashboard.jsx) offre une interface moderne pour soumettre un ticket via une boîte modale, lister ses tickets, et converser en direct avec le support.
- **Tableau de Bord Équipe :** [TeamDashboard.jsx](resources/js/Pages/Demandes/TeamDashboard.jsx) offre une interface d'administration avec des cartes statistiques globales, un filtre de recherche puissant par client/catégorie/statut, un sélecteur de statut de ticket, et une interface de messagerie.
- **En-tête & Menu :** [AuthenticatedLayout.jsx](resources/js/Layouts/AuthenticatedLayout.jsx) affiche un badge avec le rôle actuel dans la barre de navigation et comprend un lien **"🔄 Basculer d'espace"** dans le menu utilisateur pour interchanger les profils instantanément.

---

## 🔑 Comptes de Test par défaut

| Espace | Email | Mot de passe |
| :--- | :--- | :--- |
| **👤 Client / Utilisateur** | `client@bagile.com` | `password` |
| **💼 Équipe / Entreprise** | `team@bagile.com` | `password` |

---

## ⚙️ Comment valider l'intégration

1. **Vérifier que la compilation Vite tourne bien** (elle tourne déjà sur votre terminal).
2. **Aller sur la page de connexion** (`/login`).
3. **Tester les boutons de connexion rapide :**
   - Cliquez sur **Espace Client**. Vous serez redirigé vers l'interface de création et de suivi des demandes.
   - Soumettez un nouveau ticket en cliquant sur **Nouvelle demande** (choisissez la catégorie ERP ou WMS, priorité Haute, etc.). Le ticket apparaîtra dans votre historique en statut "En attente".
4. **Basculer vers l'Espace Équipe :**
   - Ouvrez le menu de profil en haut à droite (où se trouve votre nom) et cliquez sur **🔄 Basculer d'espace** (ou déconnectez-vous et connectez-vous en cliquant sur **Espace Équipe**).
   - Vous accédez à la console d'administration. Vous y trouverez toutes les demandes (dont celle fraîchement créée par le client).
5. **Gérer le ticket :**
   - Sélectionnez le ticket, changez son statut à "En cours" à l'aide du menu déroulant.
   - Saisissez un commentaire d'aide dans le champ de réponse et cliquez sur **Envoyer la réponse**.
6. **Constater la mise à jour côté Client :**
   - Basculez de nouveau vers l'espace client en cliquant sur **🔄 Basculer d'espace**.
   - Cliquez sur le ticket : vous y verrez les notifications de changement de statut et le message d'aide envoyé par l'administration.
