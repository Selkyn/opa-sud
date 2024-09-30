const { Sequelize } = require("sequelize");

// connexion à la base de données avec sequelize
const sequelize = new Sequelize("opa_sud", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Désactive les logs SQL (optionnel)
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion réussie à la base de données.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
  });
  
module.exports = sequelize;
