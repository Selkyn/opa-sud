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
    const isMobile = req.headers["user-agent"]
      ?.toLowerCase()
      .includes("mobile");

    // Configurer le cookie avec des options sécurisées
    if (isMobile) {
      // Envoyer le token dans l'en-tête pour les mobiles
      return res.json({ token: `Bearer ${token}` });
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
