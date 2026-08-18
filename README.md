# B-AGILE – Suite Logicielle Supply Chain & Gestion d'Entreprise

B-AGILE est une application web moderne combinant un site vitrine interactif et un portail de gestion de demandes de support (Ticketing) pour nos solutions de Supply Chain. Le projet est construit sur une architecture robuste utilisant **Laravel 13**, **React 18**, **Inertia.js** et **Tailwind CSS**.

---

## 🚀 Fonctionnalités Clés

### 1. Espace Client & Équipe (Support Ticketing)
- **Espace Client :** Soumission de tickets d'aide classés par catégorie et priorité, suivi en direct avec chat de discussion.
- **Espace Équipe (Support) :** Console d'administration avec statistiques globales (tickets résolus, en attente, etc.), filtres avancés, modification de statut et clavardage en direct avec le client.
- **Connexion Rapide (Démo) :** Boutons d'accès en 1 clic pour tester les deux espaces instantanément sur la page `/login`.
- **Bouton de Basculement :** Option dans le menu utilisateur pour interchanger les profils (Client ↔ Équipe) instantanément.

### 2. Présentation des Solutions B-AGILE
Le site présente nos 8 modules spécialisés :
- **ERP** (Enterprise Resource Planning) – Cœur de gestion.
- **WMS** (Warehouse Management System) – Gestion d'entrepôt avec cartographie 3D.
- **TMS** (Transport Management System) – Optimisation de tournées.
- **CRM** (Customer Relationship Management) – Pipeline commercial Kanban.
- **GMAO** (Maintenance) – Gestion préventive et curative.
- **POS** (Point of Sale) – Caisse enregistreuse tactile synchronisée.
- **E-COM** – Portails et boutiques connectés aux stocks.
- **Éducation** – Offre de formation logistique Supply Chain.

### 3. Expérience Utilisateur & Fonctionnalités Avancées
- **Intégration 3D :** Boîte interactive 3D animée (EMS) sur le Hero de la page d'accueil avec Three.js / React Three Fiber.
- **Connexion Sociale :** Authentification via Google (Laravel Socialite).
- **Animations fluides :** Transition entre pages et apparitions au défilement grâce à Framer Motion et Intersection Observer (`ScrollReveal`).
- **Notifications Emails :** Envoi automatique de rapports ou d'emails d'avertissement lors des connexions et des changements de statut.

---

## 🛠️ Stack Technique

- **Backend :** Laravel 13 (PHP 8.3+) & Laravel Sanctum / Socialite.
- **Frontend :** React 18, Inertia.js (SPA sans rechargement), Tailwind CSS (Design System moderne).
- **Compilation :** Vite 8.
- **Animations & 3D :** React Three Fiber (R3F), Framer Motion, Lucide React (Icônes).

---

## 📦 Installation et Lancement en Local

### 1. Cloner le projet et entrer dans le dossier
```bash
git clone https://github.com/idrissibouzidimohammed-stack/B-Agile2.git
cd B-Agile2
```

### 2. Installer les dépendances PHP
```bash
composer install
```

### 3. Installer les dépendances JavaScript
```bash
npm install
```

### 4. Configurer l'environnement
Copiez le fichier d'exemple et générez la clé d'application :
```bash
cp .env.example .env
php artisan key:generate
```
*Note : Renseignez vos accès de base de données dans le fichier `.env`.*

### 5. Lancer les migrations et seeders (Comptes de démo)
Remplissez la base de données avec les comptes de test et des tickets fictifs :
```bash
php artisan migrate --seed
```

### 6. Lancer les serveurs de développement
Lancez le compilateur frontend Vite et le serveur PHP :
```bash
# Terminal 1 (Frontend Vite)
npm run dev

# Terminal 2 (Backend Laravel)
php artisan serve
```

---

## 🔑 Comptes de Test par Défaut

| Rôle | Adresse Email | Mot de passe |
| :--- | :--- | :--- |
| **👤 Client** | `client@bagile.com` | `password` |
| **💼 Support / Équipe** | `team@bagile.com` | `password` |

---

## 📁 Structure du Projet

- `app/Http/Controllers/` : Contrôleurs backend (gestion des demandes, des solutions, et de l'authentification Google/Breeze).
- `app/Models/` : Modèles Eloquent (`User`, `Demande`, `DemandeResponse`).
- `database/migrations/` : Structure des tables SQL (utilisateurs, demandes, réponses, tokens).
- `resources/js/Pages/` : Pages React du site (solutions, contact, partenariat, espaces client/équipe).
- `resources/js/Components/` : Composants réutilisables (ScrollReveal, Box3D, VideoHero, etc.).
- `routes/web.php` : Définition de toutes les routes de l'application.

---

## 🌐 Déploiement (Vercel / Railway)
Le projet est configuré pour être facilement hébergé :
- Une configuration de serveur est disponible dans `vite.config.js`.
- Pour un déploiement Vercel serverless, ajoutez un fichier `vercel.json` et un point d'entrée `api/index.php` comme détaillé dans la documentation de déploiement.
