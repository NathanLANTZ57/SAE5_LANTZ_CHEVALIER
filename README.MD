# 🌱 SAE5 - Jardin de Cocagne  
**Auteurs** : CHEVALIER Noemy & LANTZ Nathan  

## 🚀 Environnement utilisé  
- **GitHub** et **Docker** pour la gestion du projet et des conteneurs.  
- **MEAN STACK** : Angular, Node.js, MongoDB.  
- **Karma** et **Jasmine** pour les tests unitaires avec Angular.  

---

## 🎉 Bienvenue dans notre projet  
Vous trouverez ici tout le contenu de notre SAE5. Ce document détaille les éléments et fichiers disponibles dans ce dépôt :  

### 📂 1. Dossier `.github`  
Ce dossier contient notre **pipeline CI/CD**.  

Ce pipeline GitHub Actions est déclenché lors des push ou pull requests sur la branche `master`. Il exécute deux jobs :  
- **Client Angular** : Télécharge le code, configure Node.js, installe les dépendances, exécute les tests, puis génère le build.  
- **Serveur Node.js** : Télécharge le code, configure Node.js, installe les dépendances et exécute les tests.
Cela assure l'intégration continue et la validation du client et du serveur.

---

### 🌐 2. Dossier `client`  
Contient tout le code côté client, développé avec **Angular**.  

- Les fichiers applicatifs sont situés dans `client/src/app/` :  
  - **HTML** : Structure des pages.  
  - **SCSS** : Styles de l'application.  
  - **TS** : Logique métier.  
  - **Spec.ts** : Tests unitaires.  
- Un fichier `Dockerfile` est présent pour construire l'application Angular, accessible via [http://localhost:4200](http://localhost:4200).  

---

### 🔧 3. Dossier `server`  
Contient tout le code côté serveur, développé avec **Node.js**.  

- **Code serveur** : Situé dans `server/src/server.ts`, il gère l'API et lance le serveur sur [http://localhost:3000](http://localhost:3000).  
- **Base de données** : Le fichier `saejardindecocagne.json` contient les données sous format JSON.  
- **Fichier `.env`** : Configure les variables sensibles comme :  
  - URI MongoDB.  
  - Port 3000.  
  - Identifiants administrateurs (non stockés dans la base de données pour des raisons de sécurité).  
- **Dockerfile** : Permet de lancer le serveur via la commande `docker-compose up --build`.  

---

### 🗂️ 4. Racine du projet  
À la racine, vous trouverez le fichier **`docker-compose.yml`** qui orchestre les `Dockerfile` des dossiers `client` et `server`, facilitant le lancement complet de l'application.  

---

## 🐳 Lancement du projet via Docker

1. Clonez le projet complet depuis GitHub :  
   ```bash
   git clone <url_du_projet>
   ```
2. Accédez à la racine du projet (le dossier contenant `.github`, `client`, et `server`).  
3. Ouvrez un terminal PowerShell.  
4. Lancez la commande suivante :  
   ```bash
   docker-compose up --build
   ```
5. Une fois le chargement terminé, vous verrez :  
   - 🚀 **Serveur lancé sur [http://localhost:3000](http://localhost:3000)**.  
   - ✅ **Connecté à MongoDB**.  

---

## 📖 Documentation API Swagger

Notre documentation API est disponible ici :  
[**Documentation SWAGGER**](https://app.swaggerhub.com/apis-docs/NATHANLANTZ57560/SAE5/1.0.0)

