const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Si tu as besoin de gérer les requêtes cross-origin

const app = express();
const PORT = 3000;

// Middleware pour analyser les requêtes en JSON
app.use(express.json());
app.use(cors()); // Facultatif : si tu veux que ton backend accepte les requêtes de ton frontend Angular

require('dotenv').config();

// connexion à la bdd atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });



// Exemple d'une route API simple
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
