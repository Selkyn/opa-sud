// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1]; //on divise le token en un tableau pour pouvoir enlever le bearer
//         const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //on decode le token avec la methode "verify"

//         req.user = { //on recupere l'id et le roleId de l'utilisateur qui se connecte grace au token
//             id: decodedToken.userId,
//             role: decodedToken.role
//         };
//     next();
//     } catch (error) {
//         res.status(401).json({ error });
//     }
// };
const jwt = require("jsonwebtoken");

exports.authToken = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
  if (!token) {
      console.log("Token manquant");
      return res.status(401).json({ isAuthenticated: false, message: "Accès non autorisé" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token valide : ", decoded); // Facultatif
      req.user = decoded;
      next();
  } catch (err) {
      console.error("Erreur de vérification du token : ", err.message); // Facultatif
      res.status(403).json({ isAuthenticated: false, message: "Token invalide ou expiré" });
  }
};