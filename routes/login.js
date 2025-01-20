const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { loginSchema } = require("../validators/loginValidator");
const { authToken } = require('../middleware/authToken');
// const passport = require("passport");

const loginCtrl = require("../controllers/login");

router.post(
  "/login",
  validate(loginSchema),
  sanitizeMiddleware,
  loginCtrl.login
);
router.post("/register", loginCtrl.signup);
router.post("/logout", loginCtrl.logout);
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
