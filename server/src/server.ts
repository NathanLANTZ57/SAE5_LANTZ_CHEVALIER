import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Si besoin de gérer les requêtes cross-origin
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT: number = 3000;

// Middleware pour analyser les requêtes en JSON
app.use(express.json());
app.use(cors()); // Facultatif : si tu veux que ton backend accepte les requêtes de ton frontend Angular

// Connexion à la base de données MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err: Error) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });

// Exemple d'une route API simple
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the backend!');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
