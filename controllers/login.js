const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

exports.signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) //on crypte le mdp

        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hashedPassword,
            roleId: 1
        });

        await user.save();
        res.status(200).json({ message: "Utilisateur créé !" });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
            include: [{
                model: Role,  // Correctly specify the model here
                as: 'role'    // Correctly specify the alias inside the include object
            }]
        });
        if (user === null) {
            return res.status(401).json({ message: 'Utilisateur introuvable' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
        }

        // Si l'utilisateur et le mot de passe sont valides, créer un token JWT et le renvoyer avec les informations utilisateur
        const token = jwt.sign(
            { userId: user.id, role: user.role.name },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
        );

        req.session.token = token;
        req.session.pseudo = user.pseudo;
           
        // Vérifier si la requête vient d'une API ou d'une page Web
        if (req.headers['content-type'] === 'application/json') {
            // Si c'est une requête API, renvoyer une réponse JSON
            res.status(200).json({
                userId: user.id,
                email: user.email,
                pseudo: user.pseudo,
                role: user.role.name,
                token: token
            });
        } else {
            // Sinon, rediriger vers la page d'accueil (ou une autre page)
            res.redirect('/');
        }
        
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
    }
};

exports.logout = (req, res) => {
    // req.logout();
    if (req.session) {
      req.session.destroy(function(err) {
        res.redirect('/');
      });
    }
    else {
      res.redirect('/');
    }
  };
// exports.login = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
        
//         const user = await User.findOne({
//             where: { email },
//             include: {
//                 model: Role,
//                 as: 'role'
//             }
//         });

//         console.log(user);
//         if (!user) {
//             return res.status(401).render('index', { error: 'Invalid email or password' });
//         }

//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(401).render('index', { error: 'Invalid email or password' });
//         }

//         // Assuming index is successful and you want to redirect to a dashboard
//         // Optionally, you could also store the user session here
//         req.session.userId = user.id;
//         console.log(req.session.userId)
//         // res.redirect('/dashboard'); // Or you can render another page

//     } catch (error) {
//         console.error('Error during index:', error);
//         res.status(500).render('index', { error: 'Server error, please try again later' });
//     }
// };