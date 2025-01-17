const validate = (schema) => {
    return async (req, res, next) => {
        try {
            // Conversion explicite avant validation
            if (req.body.postal && typeof req.body.postal !== 'string') {
                req.body.postal = String(req.body.postal);
            }
            // Valider les données avec Joi
            const validatedData = await schema.validateAsync(req.body, { convert: true });
            req.body = validatedData; // Remplace req.body par les données validées
            next();
        } catch (error) {
            console.error(error.details[0].message)
            res.status(400).json({
                message: "Validation échouée",
                details: error.details.map((err) => err.message),
            });
        }
    };
};


module.exports = { validate };
