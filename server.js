const express = require('express');
const app = require('./app');
const sequelize = require('./sequelize'); // Connexion à la base de données
require('dotenv').config();
const setupAssociations = require('./models/association'); // Importer les associations


const port = process.env.PORT || 4000;

(async () => {
    try {
        // Appliquer les associations
        setupAssociations();

        // Synchroniser la base de données
        await sequelize.sync({ alter: false }); // Utiliser alter pour ne pas perdre les données existantes
        console.log('La base de données a été synchronisée avec succès !');
    } catch (error) {
        console.error('Erreur lors de la synchronisation de la base de données :', error);
    }
})();

app.listen(port, () => {
    console.log(`Le serveur a démarré sur localhost:${port}`);
});