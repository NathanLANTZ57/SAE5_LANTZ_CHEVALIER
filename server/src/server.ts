import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const JWT_SECRET: string = process.env.JWT_SECRET || 'secretKey';

if (JWT_SECRET === 'secretKey') {
  console.warn(
    'Attention : JWT_SECRET est défini avec la valeur par défaut. Veuillez définir une valeur sécurisée dans votre fichier .env.'
  );
}

// Middleware
app.use(express.json());
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

// Schéma et modèle pour les utilisateurs
interface IUser {
  username: string;
  password: string;
  role: 'adherent' | 'employe' | 'admin';
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['adherent', 'employe', 'admin'],
  },
});

const User = mongoose.model<IUser>('User', userSchema);

// Vérification de l'administrateur en dur
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''; // Mot de passe haché dans .env
const adminRole = process.env.ADMIN_ROLE || 'admin';

// Route pour hacher un mot de passe
app.post('/api/hash-password', async (req: Request, res: Response): Promise<void> => {
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    res.status(400).json({ message: 'Veuillez fournir un mot de passe valide.' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    res.status(200).json({ hashedPassword });
  } catch (err) {
    console.error('Erreur lors du hashage du mot de passe :', err);
    res.status(500).json({ message: 'Erreur interne lors du hashage du mot de passe.' });
  }
});

// Route pour se connecter
app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).json({ message: 'Veuillez fournir un nom d’utilisateur et un mot de passe valides.' });
    return;
  }

  try {
    // Vérification des identifiants en dur
    if (
      username === adminUsername &&
      (await bcrypt.compare(password, adminPasswordHash))
    ) {
      const token = jwt.sign({ username, role: adminRole }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ token, role: adminRole });
      return;
    }

    // Vérification dans la base de données
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Mot de passe incorrect.' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur interne lors de la connexion.' });
  }
});

// Route par défaut
app.get('/api/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Bienvenue sur l’API.' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
