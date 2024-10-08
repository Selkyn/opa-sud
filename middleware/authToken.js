const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //on divise le token en un tableau pour pouvoir enlever le bearer
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //on decode le token avec la methode "verify"

        req.user = { //on recupere l'id et le roleId de l'utilisateur qui se connecte grace au token
            id: decodedToken.userId,
            role: decodedToken.role
        };
    next();
    } catch (error) {
        res.status(401).json({ error });
    }
};