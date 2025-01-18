const validate = (schema, source = "body") => {
    return async (req, res, next) => {
        try {
            // Vérifie la source spécifiée (body, params, query)
            const dataToValidate = req[source];

            // Conversion explicite pour les cas spécifiques
            if (source === "body" && dataToValidate?.postal && typeof dataToValidate.postal !== "string") {
                dataToValidate.postal = String(dataToValidate.postal);
            }

            // Valider les données avec Joi
            const validatedData = await schema.validateAsync(dataToValidate, { convert: true });

            // Remplace la partie validée de la requête par les données validées
            req[source] = validatedData;

            next();
        } catch (error) {
            console.error("Erreur de validation :", error.details[0].message);
            res.status(400).json({
                message: "Validation échouée",
                details: error.details.map((err) => err.message),
            });
        }
    };
};

module.exports = { validate };
