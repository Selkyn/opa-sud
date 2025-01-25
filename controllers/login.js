const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const Sequelize = require('sequelize');
const authToken = require('../middleware/authToken');

exports.signup = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      pseudo,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.login = async (req, res, next) => {
  try {
    // console.log("En-têtes reçus :", req.headers);
    const user = await User.findOne({
      where: { email: req.body.email },
      include: [
        {
          model: Role, // Correctly specify the model here
          as: "role",
          attributes: ["name"],
        },
      ],
    });
    if (user === null) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Paire identifiant/mot de passe incorrect" });
    }

    // Si l'utilisateur et le mot de passe sont valides, créer un token JWT et le renvoyer avec les informations utilisateur
    const token = jwt.sign(
      { userId: user.id, role: user.role.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Vérifie si le client est mobile ou web
    // const isMobile = req.headers["user-agent"]
    //   ?.toLowerCase()
    //   .includes("mobile");
        // Vérification si la requête est mobile
        const isMobile = req.headers["x-client-type"] === "mobile";
        // console.log("Token généré :", token);
    // Configurer le cookie avec des options sécurisées
    if (isMobile) {
      // console.log("Requête mobile détectée");
      // Envoyer le token dans l'en-tête pour les mobiles
      // return res.json({ token: `Bearer ${token}` });
            // Génération d'un refresh token pour les mobiles
            const refreshToken = jwt.sign(
              { userId: user.id },
              process.env.REFRESH_SECRET,
              { expiresIn: "7d" }
            );
      
            // console.log("Requête mobile détectée, refresh token généré");
            return res.json({
              token: `Bearer ${token}`,
              refreshToken, // Retourne le refresh token uniquement pour les mobiles
            });
    } else {
      // Envoyer le token dans un cookie sécurisé pour le frontend web
      res.cookie("jwt", token, {
        httpOnly: true,
        // secure: process.env.SECURE,
        // secure: req.hostname !== "localhost",
        secure: true,
        // sameSite: "strict",
        // sameSite: process.env.SAME_SITE,
        sameSite: "none",
        maxAge: 3600000, // 1 heure
      });

      return res.status(200).json({ message: "Connexion réussie" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token manquant" });
  }

  try {
    // Vérifie le refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Génère un nouveau access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Refresh token invalide ou expiré" });
  }
};


exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // secure: process.env.SECURE,
    // sameSite: process.env.SAME_SITE,
    secure: true,
    sameSite: "none",
    // secure: req.hostname !== "localhost",
    // sameSite: "strict",
  });
  res.clearCookie('_csrf', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
});
  res.status(200).json({ message: "Déconnexion réussie" });
};
