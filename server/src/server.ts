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

    // Vérifier que tous les champs requis sont présents
    if (!name || !password || !email) {
      res.status(400).json({ message: 'Nom, mot de passe et email sont requis.' });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Vérifier si l'email existe déjà
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
    
    // Ajouter un nouvel adhérent
    const newAdherent = {
      id: dbData.Adhérents.length ? dbData.Adhérents[dbData.Adhérents.length - 1].id + 1 : 1,
      name,
      password, // Attention : en production, hachez les mots de passe avec bcrypt
      email,
    };
    dbData.Adhérents.push(newAdherent);

    // Écrire les modifications dans le fichier JSON
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'Adhérent enregistré avec succès.',
      adherent: newAdherent,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
  }
});

// Route pour connecter un adhérent
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

    // Vérifier que tous les champs requis sont présents
    if (!name || !password || !email) {
      res.status(400).json({ message: 'Nom, mot de passe et email sont requis.' });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Vérifier si l'email existe déjà
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

    // Ajouter un nouvel employé
    const newEmploye = {
      id: dbData.Employes.length ? dbData.Employes[dbData.Employes.length - 1].id + 1 : 1,
      name,
      password, // Attention : en production, hachez les mots de passe avec bcrypt
      email,
    };
    dbData.Employes.push(newEmploye);

    // Écrire les modifications dans le fichier JSON
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'Employé enregistré avec succès.',
      employe: newEmploye,
    });
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
      Nom,
      Prénom,
      DateDeNaissance,
      AdresseMail,
      AdressePostale,
      Ville,
      CodePostal,
      Cotisation,
      Don,
      FormulePanierLegumesBio,
      NbPanierLegumesBio,
      FormulePanierFruitsBio,
      NbPanierFruitsBio,
      FormuleBoiteOeufsBio,
      NbPanierOeufsBio,
      Dépôt,
      Domicile,
      FormulePayement,
      IBAN,
      BIC,
    } = req.body;

    // Validation des champs obligatoires
    if (!Nom || !Prénom || !AdresseMail || Cotisation !== 5 || FormulePanierLegumesBio !== 'Simple6') {
      res.status(400).json({
        message: 'Champs obligatoires manquants ou invalides. Assurez-vous que la cotisation est de 5 euros et la formule légumes bio est Simple6.',
      });
      return;
    }

    // Lire la base de données JSON
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Vérifier si l'email existe déjà
    const existingAbonne = dbData.AdhérentsAbonnés?.find((abonne: any) => abonne.AdresseMail === AdresseMail);
    if (existingAbonne) {
      res.status(409).json({ message: 'Un abonné avec cet email existe déjà.' });
      return;
    }

    // Ajouter un nouvel AdhérentAbonné
    const newAbonne = {
      id: dbData.AdhérentsAbonnés?.length ? dbData.AdhérentsAbonnés[dbData.AdhérentsAbonnés.length - 1].id + 1 : 1,
      Nom,
      Prénom,
      DateDeNaissance,
      AdresseMail,
      AdressePostale,
      Ville,
      CodePostal,
      Cotisation,
      Don: Don || 0.0,
      FormulePanierLegumesBio,
      NbPanierLegumesBio: NbPanierLegumesBio || 0,
      FormulePanierFruitsBio: FormulePanierFruitsBio || false,
      NbPanierFruitsBio: NbPanierFruitsBio || 0,
      FormuleBoiteOeufsBio: FormuleBoiteOeufsBio || false,
      NbPanierOeufsBio: NbPanierOeufsBio || 0,
      Dépôt,
      Domicile,
      FormulePayement,
      IBAN,
      BIC,
    };

    // Ajouter à la base de données
    dbData.AdhérentsAbonnés = dbData.AdhérentsAbonnés || [];
    dbData.AdhérentsAbonnés.push(newAbonne);

    // Écrire dans le fichier JSON
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.status(201).json({
      message: 'AdhérentAbonné enregistré avec succès.',
      abonne: newAbonne,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
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
