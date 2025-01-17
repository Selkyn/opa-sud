const sanitizeHtml = require('sanitize-html')

const sanitizeData = (data) => {
    if (typeof data === 'string') {
        return sanitizeHtml(data, { allowedTags: [], allowedAttributes: {} });
    }
    if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach((key) => {
            data[key] = sanitizeData(data[key]); // Appel récursif pour traiter les objets et tableaux
        });
    }
    return data;
};

const sanitizeMiddleware = (req, res, next) => {
    req.body = sanitizeData(req.body); // Nettoie req.body
    next(); // Passe au contrôleur
};

module.exports = { sanitizeMiddleware };
