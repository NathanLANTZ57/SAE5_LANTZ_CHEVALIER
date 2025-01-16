import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Autorise Angular uniquement
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Chemin vers le fichier JSON
const dbPath = path.resolve('./saejardindecocagne.json');

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('✅ Connecté à MongoDB');
  })
  .catch((err: Error) => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
    process.exit(1);
  });

// Route pour l'authentification admin
app.post('/api/login/admin', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    console.log('Requête reçue - username:', username, ', password:', password);
    console.log('Variables .env - ADMIN_USERNAME:', process.env.ADMIN_USERNAME, ', ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);

    if (!username || !password) {
      res.status(400).json({ message: 'Nom d’utilisateur et mot de passe requis.' });
      return;
    }

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.status(200).json({
        message: 'Authentification réussie',
        admin: {
          username: process.env.ADMIN_USERNAME,
          role: process.env.ADMIN_ROLE,
          jwtSecret: process.env.JWT_SECRET,
        },
      });
    } else {
      res.status(401).json({
        message: "Échec de l'authentification : identifiants incorrects",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour enregistrer un nouvel adhérent
app.post('/api/login/adherent', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      res.status(400).json({ message: 'Nom, mot de passe et email sont requis.' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const existingAdherent = dbData.Adhérents.find((adherent: any) => adherent.email === email);
    if (existingAdherent) {
      res.status(409).json({ message: 'Un adhérent avec cet email existe déjà.' });
      return;
    }

    const existingName = dbData.Adhérents.find((adherent: any) => adherent.name === name);
    if (existingName) {
      res.status(409).json({ message: 'Un adhérent avec ce nom existe déjà.' });
      return;
    }

    // Ajouter un nouvel adhérent avec statut "pending"
    const newAdherent = {
      id: dbData.Adhérents.length ? dbData.Adhérents[dbData.Adhérents.length - 1].id + 1 : 1,
      name,
      password,
      email,
      status: 'pending', // Nouveau champ
    };

    dbData.Adhérents.push(newAdherent);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'Adhérent enregistré avec succès. En attente de validation.',
      adherent: newAdherent,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// route qui verifie le statut de l'adherent
app.patch('/api/adherents/:id/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['validated', 'rejected'].includes(status)) {
      res.status(400).json({ message: 'Statut invalide.' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const adherent = dbData.Adhérents.find((adherent: any) => adherent.id === parseInt(id, 10));

    if (!adherent) {
      res.status(404).json({ message: 'Adhérent non trouvé.' });
      return;
    }

    adherent.status = status;

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(200).json({ message: 'Statut mis à jour avec succès.', adherent });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// route connexion adhérent
app.post('/api/login/adherent/connect', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;

    // Vérifier que tous les champs requis sont présents
    if (!name || !password) {
      res.status(400).json({ message: 'Nom et mot de passe sont requis.' });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Trouver un adhérent avec le nom et le mot de passe
    const adherent = dbData.Adhérents.find(
      (adherent: any) => adherent.name === name && adherent.password === password
    );

    if (!adherent) {
      res.status(401).json({ message: 'Nom ou mot de passe incorrect.' });
      return;
    }

    // Vérifier si l'adhérent a été validé
    if (adherent.status !== 'validated') {
      res.status(403).json({ message: 'Votre compte est en attente de validation par un administrateur.' });
      return;
    }

    // Authentification réussie
    res.status(200).json({
      message: 'Connexion réussie.',
      adherent: {
        id: adherent.id,
        name: adherent.name,
        email: adherent.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour enregistrer un nouvel employé
app.post('/api/login/employe', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      res.status(400).json({ message: 'Nom, mot de passe et email sont requis.' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const existingEmploye = dbData.Employes.find((employe: any) => employe.email === email);
    if (existingEmploye) {
      res.status(409).json({ message: 'Un employé avec cet email existe déjà.' });
      return;
    }

    const existingName = dbData.Employes.find((employe: any) => employe.name === name);
    if (existingName) {
      res.status(409).json({ message: 'Un employé avec ce nom existe déjà.' });
      return;
    }

    // Ajouter un nouvel employé avec statut "pending"
    const newEmploye = {
      id: dbData.Employes.length ? dbData.Employes[dbData.Employes.length - 1].id + 1 : 1,
      name,
      password,
      email,
      status: 'pending', // Nouveau champ
    };

    dbData.Employes.push(newEmploye);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'Employé enregistré avec succès. En attente de validation.',
      employe: newEmploye,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

app.patch('/api/employes/:id/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['validated', 'rejected'].includes(status)) {
      res.status(400).json({ message: 'Statut invalide.' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const employe = dbData.Employes.find((employe: any) => employe.id === parseInt(id, 10));

    if (!employe) {
      res.status(404).json({ message: 'Employé non trouvé.' });
      return;
    }

    employe.status = status;

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(200).json({ message: 'Statut mis à jour avec succès.', employe });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

app.get('/api/employes/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;

    if (!status) {
      res.status(400).json({ message: 'Le paramètre status est requis.' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const employes = dbData.Employes.filter((employe: any) => employe.status === status);

    res.status(200).json(employes);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});


// Route pour connecter un employé
app.post('/api/login/employe/connect', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;

    // Vérifier que tous les champs requis sont présents
    if (!name || !password) {
      res.status(400).json({ message: 'Nom et mot de passe sont requis.' });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Trouver un employé avec le nom et le mot de passe
    const employe = dbData.Employes.find(
      (employe: any) => employe.name === name && employe.password === password
    );

    if (!employe) {
      res.status(401).json({ message: 'Nom ou mot de passe incorrect.' });
      return;
    }

    // Authentification réussie
    res.status(200).json({
      message: 'Connexion réussie.',
      employe: {
        id: employe.id,
        name: employe.name,
        email: employe.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour enregistrer un nouvel AdhérentsAbonnés
app.post('/api/register/adherentsabonne', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nom,
      prenom,
      date_naissance,
      adresse_mail,
      adresse_postale,
      ville,
      code_postal,
      cotisation,
      don,
      formule_panier_legumes_bio,
      nb_panier_legumes_bio,
      formule_panier_fruits_bio,
      nb_panier_fruits_bio,
      formule_boite_oeufs_bio,
      nb_panier_oeufs_bio,
      depot,
      domicile,
      formule_payement,
      iban,
      bic,
    } = req.body;

    // Log des données reçues pour le debug
    console.log('Données reçues pour la création d\'un abonné :', req.body);

    // Validation des champs obligatoires
    if (!nom || !prenom || !adresse_mail || !cotisation) {
      res.status(400).json({
        message: 'Champs obligatoires manquants ou invalides. Veuillez vérifier vos données.',
      });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Vérifier si l'email existe déjà
    const existingAbonne = dbData.AdhérentsAbonnés?.find((abonne: any) => abonne.adresse_mail === adresse_mail);
    if (existingAbonne) {
      res.status(409).json({ message: 'Un abonné avec cet email existe déjà.' });
      return;
    }

    // Ajouter un nouvel AdhérentAbonné
    const newAbonne = {
      id: dbData.AdhérentsAbonnés?.length ? dbData.AdhérentsAbonnés[dbData.AdhérentsAbonnés.length - 1].id + 1 : 1,
      nom,
      prenom,
      date_naissance,
      adresse_mail,
      adresse_postale,
      ville,
      code_postal,
      cotisation,
      don: don || 0,
      formule_panier_legumes_bio: formule_panier_legumes_bio || false,
      nb_panier_legumes_bio: nb_panier_legumes_bio || 0,
      formule_panier_fruits_bio: formule_panier_fruits_bio || false,
      nb_panier_fruits_bio: nb_panier_fruits_bio || 0,
      formule_boite_oeufs_bio: formule_boite_oeufs_bio || false,
      nb_panier_oeufs_bio: nb_panier_oeufs_bio || 0,
      depot: depot || false,
      domicile: domicile || false,
      formule_payement: formule_payement,
      iban,
      bic,
      statut_paiement: 'en_attente', // Ajout du statut de paiement par défaut
    };

    // Ajouter à la base de données
    dbData.AdhérentsAbonnés = dbData.AdhérentsAbonnés || [];
    dbData.AdhérentsAbonnés.push(newAbonne);

    // Écrire dans le fichier JSON
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'AdhérentAbonné enregistré avec succès. Statut du paiement : en attente.',
      abonne: newAbonne,
    });
  } catch (error) {
    console.error('Erreur interne du serveur :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour récupérer les informations de l'AdhérentsAbonnés en fonction de l'email de l'adhérent connecté
app.get('/api/adherentsabonne', async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupérer l'email de l'utilisateur connecté (passé via une requête query)
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ message: 'Adresse email est requise' });
      return;
    }

    // Lire les données du fichier JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Vérifier si l'email existe dans la table Adhérents
    const adherent = dbData.Adhérents.find(
      (a: any) => a.email.toLowerCase() === (email as string).toLowerCase()
    );

    if (!adherent) {
      res.status(404).json({ message: "Utilisateur non trouvé dans la table 'Adhérents'" });
      return;
    }

    // Rechercher les informations dans la table AdhérentsAbonnés correspondant à cet emaill
    const adherentAbonne = dbData.AdhérentsAbonnés.find(
      (a: any) => a.adresse_mail?.toLowerCase() === (email as string).toLowerCase()
    );

    if (!adherentAbonne) {
      res.status(404).json({ message: "Aucune donnée trouvée dans 'AdhérentsAbonnés' pour cet email" });
      return;
    }

    // Retourner les données de l'AdhérentsAbonnés
    res.status(200).json(adherentAbonne);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'AdhérentsAbonnés :', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error instanceof Error ? error.message : 'Erreur inconnue' });
  }
});

// Requete pour avoir l'username de l'adherent
app.get('/api/adherents', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.query;

    if (!username) {
      res.status(400).json({ message: 'Username est requis' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const adherent = dbData.Adhérents.find(
      (a: any) => a.name.toLowerCase() === (username as string).toLowerCase()
    );

    if (!adherent) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json({ email: adherent.email });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'adresse e-mail :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// requete pour avoir l'username de l'employe
app.get('/api/employes', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.query;

    if (!username) {
      res.status(400).json({ message: 'Username est requis' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const employe = dbData.Employes.find(
      (e: any) => e.name.toLowerCase() === (username as string).toLowerCase()
    );

    if (!employe) {
      res.status(404).json({ message: "Employé non trouvé" });
      return;
    }

    res.status(200).json({ email: employe.email });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'adresse e-mail :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});


app.get('/api/adherents/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;

    // Vérifiez si le paramètre `status` est fourni
    if (!status) {
      res.status(400).json({ message: 'Le paramètre status est requis.' });
      return;
    }

    // Lire les données de la base
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Filtrer les adhérents en fonction du statut
    const adherents = dbData.Adhérents.filter(
      (adherent: any) => adherent.status === status
    );

    // Retourner les adhérents filtrés
    res.status(200).json(adherents);
  } catch (error) {
    console.error('Erreur lors de la récupération des adhérents par statut :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});


// Route pour ajouter un fruit
app.post('/api/fruits', async (req: Request, res: Response): Promise<void> => {
  try {
    const { categorie, nom, quantite } = req.body;

    // Validation des données reçues
    if (!categorie || !nom || quantite === undefined) {
      res.status(400).json({ message: 'Tous les champs sont requis : catégorie, nom, quantité.' });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Ajouter le nouvel élément
    const newFruit = {
      id: dbData.Fruits.length ? dbData.Fruits[dbData.Fruits.length - 1].id + 1 : 1,
      categorie,
      nom,
      quantite,
    };

    dbData.Fruits.push(newFruit);

    // Écrire les modifications dans le fichier JSON
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'Fruit ajouté avec succès.',
      fruit: newFruit,
    });
  } catch (error) {
    console.error('Erreur interne du serveur :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour ajouter un légume
app.post('/api/legumes', async (req: Request, res: Response): Promise<void> => {
  try {
    const { categorie, nom, quantite } = req.body;

    // Validation des données reçues
    if (!categorie || !nom || quantite === undefined) {
      res.status(400).json({ message: 'Tous les champs sont requis : catégorie, nom, quantité.' });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Ajouter le nouvel élément
    const newLegume = {
      id: dbData.Légumes.length ? dbData.Légumes[dbData.Légumes.length - 1].id + 1 : 1,
      categorie,
      nom,
      quantite,
    };

    dbData.Légumes.push(newLegume);

    // Écrire les modifications dans le fichier JSON
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'Légume ajouté avec succès.',
      legume: newLegume,
    });
  } catch (error) {
    console.error('Erreur interne du serveur :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour récupérer tous les fruits
app.get('/api/fruits/afficher', async (req: Request, res: Response): Promise<void> => {
  try {
    // Lire les données du fichier JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Retourner la liste des fruits
    res.status(200).json(dbData.Fruits || []);
  } catch (error) {
    console.error('Erreur lors de la récupération des fruits :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour récupérer tous les légumes
app.get('/api/legumes/afficher', async (req: Request, res: Response): Promise<void> => {
  try {
    // Lire les données du fichier JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Retourner la liste des légumes
    res.status(200).json(dbData.Légumes || []);
  } catch (error) {
    console.error('Erreur lors de la récupération des légumes :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour mettre à jour le statut de paiement d'un AdhérentsAbonnés
app.patch('/api/adherentsabonne/:id/statut_paiement', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { statut_paiement } = req.body;

    if (!['pending', 'validated', 'rejected'].includes(statut_paiement)) {
      res.status(400).json({ message: 'Statut de paiement invalide.' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const adherent = dbData.AdhérentsAbonnés.find((a: any) => a.id === parseInt(id, 10));

    if (!adherent) {
      res.status(404).json({ message: 'Adhérent non trouvé.' });
      return;
    }

    adherent.statut_paiement = statut_paiement;

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    res.status(200).json({ message: 'Statut de paiement mis à jour avec succès.', adherent });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de paiement :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Nouvelle route pour récupérer tous les abonnés sans email
app.get('/api/adherentsabonne/all', async (req: Request, res: Response): Promise<void> => {
  try {
    // Lire les données du fichier JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Vérifier si la clé AdhérentsAbonnés existe dans les données
    if (!dbData.AdhérentsAbonnés || dbData.AdhérentsAbonnés.length === 0) {
      res.status(404).json({ message: 'Aucun abonné trouvé.' });
      return;
    }

    // Retourner tous les abonnés
    res.status(200).json(dbData.AdhérentsAbonnés);
  } catch (error) {
    console.error('Erreur lors de la récupération des abonnés :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour enregistrer un nouvel EmployéAbonné
app.post('/api/register/employesabonne', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nom,
      prenom,
      date_naissance,
      adresse_mail,
      adresse_postale,
      ville,
      code_postal,
      formule_panier,
      statut_paiement,
    } = req.body;

    // Validation des champs obligatoires
    if (!nom || !prenom || !adresse_mail || !formule_panier) {
      res.status(400).json({
        message: 'Champs obligatoires manquants ou invalides. Veuillez vérifier vos données.',
      });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Vérifier si l'email existe déjà
    const existingAbonne = dbData.EmployésAbonnés?.find((abonne: any) => abonne.adresse_mail === adresse_mail);
    if (existingAbonne) {
      res.status(409).json({ message: 'Un abonné avec cet email existe déjà.' });
      return;
    }

    // Ajouter un nouvel EmployéAbonné
    const newAbonne = {
      id: dbData.EmployésAbonnés?.length ? dbData.EmployésAbonnés[dbData.EmployésAbonnés.length - 1].id + 1 : 1,
      nom,
      prenom,
      date_naissance,
      adresse_mail,
      adresse_postale,
      ville,
      code_postal,
      formule_panier,
      statut_paiement: statut_paiement || 'en_attente', // Par défaut, statut "en_attente"
    };

    // Ajouter à la base de données
    dbData.EmployésAbonnés = dbData.EmployésAbonnés || [];
    dbData.EmployésAbonnés.push(newAbonne);

    // Écrire dans le fichier JSON
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'EmployéAbonné enregistré avec succès.',
      abonne: newAbonne,
    });
  } catch (error) {
    console.error('Erreur interne du serveur :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour récupérer les informations d’un EmployéAbonné par email
app.get('/api/employesabonne', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ message: 'Adresse email est requise.' });
      return;
    }

    // Lire les données du fichier JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Trouver l'abonné correspondant
    const employeAbonne = dbData.EmployésAbonnés?.find(
      (abonne: any) => abonne.adresse_mail?.toLowerCase() === (email as string).toLowerCase()
    );

    if (!employeAbonne) {
      res.status(404).json({ message: 'Aucun EmployéAbonné trouvé avec cet email.' });
      return;
    }

    res.status(200).json(employeAbonne);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour récupérer tous les EmployésAbonnés
app.get('/api/employesabonne/all', async (req: Request, res: Response): Promise<void> => {
  try {
    // Lire les données du fichier JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Vérifier si la clé EmployésAbonnés existe dans les données
    if (!dbData.EmployésAbonnés || dbData.EmployésAbonnés.length === 0) {
      res.status(404).json({ message: 'Aucun EmployéAbonné trouvé.' });
      return;
    }

    // Retourner tous les employés abonnés
    res.status(200).json(dbData.EmployésAbonnés);
  } catch (error) {
    console.error('Erreur lors de la récupération des employés abonnés :', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour mettre à jour le statut de paiement d’un EmployéAbonné
app.patch('/api/employesabonne/:id/statut_paiement', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { statut_paiement } = req.body;

    if (!['en_attente', 'validé', 'rejeté'].includes(statut_paiement)) {
      res.status(400).json({ message: 'Statut de paiement invalide.' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const employe = dbData.EmployésAbonnés.find((e: any) => e.id === parseInt(id, 10));

    if (!employe) {
      res.status(404).json({ message: 'EmployéAbonné non trouvé.' });
      return;
    }

    employe.statut_paiement = statut_paiement;

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    res.status(200).json({ message: 'Statut de paiement mis à jour avec succès.', employe });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de paiement :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// récuperer les trajets de livraison
app.get('/api/trajets-livraison', async (req: Request, res: Response): Promise<void> => {
  try {
    const { day } = req.query;
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const trajets = dbData.TrajetsLivraison || [];
    const filteredTrajets = day ? trajets.filter((t: any) => t.day === day) : trajets;
    res.status(200).json(filteredTrajets);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des trajets.' });
  }
});

// ajouter un trajet de livraison
app.post('/api/trajets-livraison', async (req: Request, res: Response): Promise<void> => {
  try {
    const { day, type, locations } = req.body;

    if (!day || !type || !locations || !Array.isArray(locations)) {
      res.status(400).json({ message: 'Les champs day, type et locations sont requis.' });
      return;
    }

    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const newTrajet = {
      id: dbData.TrajetsLivraison.length
        ? dbData.TrajetsLivraison[dbData.TrajetsLivraison.length - 1].id + 1
        : 1,
      day,
      type,
      locations
    };

    dbData.TrajetsLivraison.push(newTrajet);
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({ message: 'Trajet ajouté avec succès.', trajet: newTrajet });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l’ajout du trajet.' });
  }
});

// Supprimer un trajet de livraison 
app.delete('/api/trajets-livraison/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const index = dbData.TrajetsLivraison.findIndex((t: any) => t.id === parseInt(id, 10));
    if (index === -1) {
      res.status(404).json({ message: 'Trajet non trouvé.' });
      return;
    }

    dbData.TrajetsLivraison.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(200).json({ message: 'Trajet supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du trajet.' });
  }
});


// Route de test par défaut
app.get('/api/test', async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Bienvenue sur l’API.' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
