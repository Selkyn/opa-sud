const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User'); // Modèle Sequelize

const opts = {
    jwtFromRequest: (req) => {
        // Préférence pour le cookie JWT
        if (req && req.cookies && req.cookies.jwt) {
            return req.cookies.jwt;
        }

        // Sinon, utilise l'en-tête Authorization
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    },
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // Remplacement de `findById` par Sequelize
                const user = await User.findByPk(jwt_payload.userId); // `findByPk` recherche par clé primaire
                if (user) {
                    return done(null, user); // Si trouvé, retourne l'utilisateur
                }
                return done(null, false); // Aucun utilisateur trouvé
            } catch (err) {
                console.error('Erreur dans Passport JWT Strategy:', err);
                return done(err, false);
            }
        })
    );
};
