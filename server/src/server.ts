import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Charger les variables d'environnement
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

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

// Route de test par défaut
app.get('/api/test', async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Bienvenue sur l’API.' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
