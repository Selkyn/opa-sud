const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { loginSchema } = require("../validators/loginValidator");
const { authToken } = require('../middleware/authToken');
const rateLimit = require("express-rate-limit");
// const passport = require("passport");

const loginCtrl = require("../controllers/login");

// Limitation des tentatives de login
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // Limite à 10 tentatives par fenêtre
//   message: "Trop de tentatives de connexion. Réessayez plus tard.",
// });

router.post(
  "/login",
  // loginLimiter,
  validate(loginSchema),
  sanitizeMiddleware,
  loginCtrl.login
);
router.post("/register", loginCtrl.signup);
router.post("/logout", authToken, loginCtrl.logout);
// Route protégée pour vérifier l'authentification

router.get("/check", authToken, (req, res) => {
    res.status(200).json({
      isAuthenticated: true,
      user: req.user, // Renvoyer les infos utilisateur du token
    });
  });

module.exports = router;


// router.get(
//     "/protected",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//       res.status(200).json({
//         message: "Bienvenue sur une route protégée !",
//         user: req.user, // Passport injecte l'utilisateur ici
//       });
//     }
//   );
