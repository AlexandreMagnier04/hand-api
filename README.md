# 🏅 API de Gestion du club de Handball de Comines

Une API RESTful construite avec **NestJS**, **TypeORM** et **SQLite**. Elle permet la gestion des utilisateurs, des matchs, des inscriptions et des actualités avec un système de permissions strict.

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [Postman](https://www.postman.com/) (pour tester l'API)

## 🛠️ Installation

1.  **Cloner le projet :**

    ```bash
    git clone <LIEN_DU_REPO_GIT>
    cd nom-du-projet
    ```

2.  **Installer les dépendances :**

    ```bash
    npm install
    ```

## ▶️ Lancement

Pour lancer le serveur en mode développement (avec rechargement automatique) :

```bash
npm run start
```

# 🛡️ Guide des Rôles & Initialisation des Données

### 👑 ADMIN (`admin`)

C'est le super-utilisateur. Il possède un "Passe-Partout" lui donnant accès à tout, mais ses fonctions principales sont :

- **Gestion des Utilisateurs :**
  - Voir la liste de tous les inscrits (avec leurs matchs) : `GET /users`
  - Voir le profil détaillé d'un utilisateur spécifique : `GET /users/:id`
  - Changer rôle d'un utilisateur : `PATCH /users/:id/role`
- **Modération :** Peut modifier ou supprimer n'importe quel contenu (News, Matchs) si nécessaire.
- **Force Majeure :** Peut inscrire manuellement un joueur à un match : `POST /games/:id/player/:playerId`

### 🧢 COACH (`coach`)

Responsable de l'organisation sportive.

- **Gestion des Matchs :**
  - Créer un nouveau match : `POST /games`
  - Modifier un match (Changer la date, ajouter le Score final) : `PATCH /games/:id`
  - _Note : Impossible de créer deux matchs à la même date._
- **Gestion d'équipe :**
  - Inscrire un joueur de force à un match (s'il a oublié de le faire) : `POST /games/:id/player/:playerId`
- **Lecture :** Peut voir tous les inscrits.

### 📰 CONTRIBUTEUR (`contributeur`)

Responsable de la communication.

- **News :**
  - Publier une actualité : `POST /news`
- **Restrictions :** Ne peut pas toucher aux matchs ni aux rôles des utilisateurs.

### 🏃 JOUEUR (`joueur`)

L'utilisateur standard (rôle par défaut à l'inscription).

- **Participation :**
  - S'inscrire à un match : `POST /games/:id/join`
  - Se désinscrire d'un match : `DELETE /games/:id/join`
- **Lecture :**
  - Voir son propre profil : `GET /users/profile`
  - Voir la liste des matchs et les news.
- **Restrictions :** Strictes. Ne peut rien créer, ne peut pas voir la liste des autres utilisateurs, ne peut pas modifier les scores.

### TOUT LE MONDE - **Lecture :** Peut voir la liste des matchs, les news, et les utilsateurs

---

## 2. Guide d'Initialisation des Données (Seeding) 🚀

Voici comment peupler votre base de données en partant de zéro, étape par étape, via Postman ou cURL.

### Étape 1 : Créer les 4 comptes de base

_Tout le monde s'inscrit d'abord comme "joueur"._

**Route :** `POST /users/register`

1.  **L'Admin :**
    ```json
    {
      "email": "admin@club.com",
      "password": "pass",
      "firstname": "Super",
      "lastname": "Admin"
    }
    ```
2.  **Le Coach :**
    ```json
    {
      "email": "coach@club.com",
      "password": "pass",
      "firstname": "Jean",
      "lastname": "Traine"
    }
    ```
3.  **Le Contributeur :**
    ```json
    {
      "email": "reporter@club.com",
      "password": "pass",
      "firstname": "Tintin",
      "lastname": "Reporter"
    }
    ```
4.  **Le Joueur :**
    ```json
    {
      "email": "player@club.com",
      "password": "pass",
      "firstname": "Nico",
      "lastname": "Karabatic"
    }
    ```

---

### Étape 2 : Changer les rôles manuellement (Via la base de données)

À ce stade, tout le monde est `joueur`. Personne ne peut changer les rôles car il faut être Admin pour le faire.

**Solution :**
Vous devez intervenir manuellement **une seule fois** dans la base de données (via un outil comme _DB Browser for SQLite_ ou _DBeaver_) pour passer le rôle de `admin@club.com` à `admin`.

Une fois cela fait, connectez-vous en Admin pour récupérer le **TOKEN SUPRÊME**.

**Route :** `POST /auth/login`

- Login : `admin@club.com` / `pass`
- **Action :** Copiez le `access_token` reçu.

---

### Étape 3 : Assigner les Rôles (Via l'API)

_Utilisez le Token de l'Admin dans le Header `Authorization: Bearer <TOKEN>`._

**Route :** `PATCH /users/:id/role`

1.  **Promouvoir le Coach (ID 2) :**
    - URL : `http://localhost:3000/users/2/role`
    - Body : `{ "role": "coach" }`
2.  **Promouvoir le Contributeur (ID 3) :**
    - URL : `http://localhost:3000/users/3/role`
    - Body : `{ "role": "contributeur" }`

---

### Étape 4 : Créer du contenu

#### A. Le Coach crée des matchs 📅

_Connectez-vous avec `coach@club.com` pour récupérer son Token._

**Route :** `POST /games`

- Body :
  ```json
  { "date": "2026-06-12T20:00:00.000Z", "opponent": "Real Madrid" }
  ```

#### B. Le Contributeur crée des news 📰

_Connectez-vous avec `reporter@club.com` pour récupérer son Token._

**Route :** `POST /news`

- Body :
  ```json
  {
    "title": "Match de Gala",
    "description": "Gros match contre le Real ce soir !"
  }
  ```

---

### Étape 5 : La vie du club (Inscriptions & Scores)

#### A. Le Joueur s'inscrit ✍️

_Connectez-vous avec `player@club.com`._

**Route :** `POST /games/1/join` (Aucun body nécessaire)

#### B. Le Match est fini : Le Coach met le score 🏆

_Utilisez le Token du Coach._

**Route :** `PATCH /games/1`

- Body :

```json
{ "score_hcc": 30, "score_opponent": 25 }
```

---
