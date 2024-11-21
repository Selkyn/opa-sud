        // let vetCenter = null;
        // if (vetCenterId && vetCenterId !== 'other') {
        //     console.log("Sélection d'un centre vétérinaire existant:", vetCenterId);
        //     vetCenter = await VetCenter.findByPk(vetCenterId);
        //     if (!vetCenter) {
        //         console.error("Centre vétérinaire non trouvé :", vetCenterId);
        //         return res.status(400).json({ error: 'Centre vétérinaire non trouvé.' });
        //     }
        // } else if (vetCenterId === 'other') {
        //     console.log("Création d'un centre vétérinaire personnalisé:", nameVetCenter);
        
        //     if (!adressVetCenter || !postalVetCenter || !cityVetCenter) {
        //         console.error("Adresse incomplète pour le centre vétérinaire :", {
        //             adressVetCenter,
        //             postalVetCenter,
        //             cityVetCenter
        //         });
        //         return res.status(400).json({
        //             error: "Veuillez fournir une adresse complète pour le centre vétérinaire."
        //         });
        //     }
        
        //     let vetLat = null;
        //     let vetLng = null;
        
        //     try {
        //         const coords = await makeCoord(adressVetCenter, postalVetCenter, cityVetCenter);
        //         vetLat = coords.lat;
        //         vetLng = coords.lng;
        //     } catch (error) {
        //         console.warn("Impossible de récupérer les coordonnées pour le centre vétérinaire :", {
        //             adressVetCenter,
        //             postalVetCenter,
        //             cityVetCenter
        //         });
        //     }
        
        //     vetCenter = await VetCenter.findOne({ where: { email: emailVetCenter } });
        //     if (!vetCenter) {
        //         vetCenter = await VetCenter.create({
        //             name: nameVetCenter,
        //             adress: adressVetCenter,
        //             city: cityVetCenter,
        //             department: departmentVetCenter,
        //             postal: postalVetCenter,
        //             phone: phoneVetCenter,
        //             email: emailVetCenter,
        //             latitude: vetLat,
        //             longitude: vetLng
        //         });
        //     }
        // } else {
        //     console.log("Aucun centre vétérinaire sélectionné, saut de l'étape de géolocalisation.");
        // }
        
        //         // Vérifiez que vetCenter a bien été créé ou récupéré
        //         if (!vetCenter) {
        //             return res.status(500).json({ error: "Erreur lors de la gestion du centre vétérinaire." });
        //         }
        
        // // Ajouter les vétérinaires au centre vétérinaire, qu’il soit nouveau ou existant
        // for (const vet of vets) {
        //     // Vérification des champs de vétérinaire
        //     const firstname = vet.firstname ? capitalizeFirstLetter(vet.firstname) : null;
        //     const lastname = vet.lastname ? capitalizeFirstLetter(vet.lastname) : null;
        //     const email = vet.email ? vet.email : null;
        
        //     // Vérifier que les informations minimales du vétérinaire sont présentes
        //     if (firstname && lastname) {
        //         console.log("Ajout du vétérinaire :", firstname, lastname, email);
        //         await Vet.create({
        //             firstname,
        //             lastname,
        //             email,
        //             vetCenterId: vetCenter.id
        //         });
        //     } else {
        //         console.log("Données vétérinaires manquantes, pas d'ajout :", vet);
        //     }
        // }
        // console.log("Vétérinaires ajoutés au centre:", vetCenter.name);
        // console.log("Centre vétérinaire trouvé ou créé:", vetCenter);

        // Gestion du centre ostéopathe
        // let osteoCenter;
        // if (osteoCenterId && osteoCenterId !== 'other') {
        //     console.log("Sélection d'un centre vétérinaire existant:", osteoCenterId);
        //     osteoCenter = await osteoCenter.findByPk(osteoCenterId);
        //     if (!osteoCenter) {
        //         console.error("Centre vétérinaire non trouvé :", osteoCenterId);
        //         return res.status(400).json({ error: 'Centre vétérinaire non trouvé.' });
        //     }
        // } else if (osteoCenterId === 'other' || !osteoCenterId) {
        //     // Si vetCenterId est "other" ou vide, créer un centre vétérinaire personnalisé
        //     console.log("Création d'un centre vétérinaire personnalisé:", nameOsteoCenter);
        
        //     const { lat: osteoLat, lng: osteoLng } = await makeCoord(adressOsteoCenter, postalOsteoCenter, cityOsteoCenter);
        
        //     // Vérifier si le centre vétérinaire personnalisé existe déjà via email
        //     osteoCenter = await OsteoCenter.findOne({ where: { email: emailOsteoCenter } });
        //     if (!osteoCenter) {
        //         // Créer un nouveau centre vétérinaire si non trouvé
        //         osteoCenter = await OsteoCenter.create({
        //             name: nameOsteoCenter,
        //             adress: adressOsteoCenter,
        //             city: cityOsteoCenter,
        //             department: departmentOsteoCenter,
        //             postal: postalOsteoCenter,
        //             phone: phoneOsteoCenter,
        //             email: emailOsteoCenter,
        //             latitude: osteoLat,
        //             longitude: osteoLng
        //         });
        //         console.log("Centre vétérinaire personnalisé créé:", osteoCenter);
        //     } else {
        //         console.log("Centre vétérinaire personnalisé existant trouvé:", osteoCenter);
        //     }
        // }
        
        // // Ajouter les vétérinaires au centre vétérinaire, qu’il soit nouveau ou existant
        // for (const osteo of osteos) {
        //     // Vérification des champs de vétérinaire
        //     const firstname = osteo.firstname ? capitalizeFirstLetter(osteo.firstname) : null;
        //     const lastname = osteo.lastname ? capitalizeFirstLetter(osteo.lastname) : null;
        //     const email = osteo.email ? osteo.email : null;
        
        //     // Vérifier que les informations minimales du vétérinaire sont présentes
        //     if (firstname && lastname) {
        //         console.log("Ajout du vétérinaire :", firstname, lastname, email);
        //         await Osteo.create({
        //             firstname,
        //             lastname,
        //             email,
        //             osteoCenterId: osteoCenter.id
        //         });
        //     } else {
        //         console.log("Données vétérinaires manquantes, pas d'ajout :", osteo);
        //     }
        // }
        // console.log("Vétérinaires ajoutés au centre:", osteoCenter.name);
        // console.log("Centre vétérinaire trouvé ou créé:", osteoCenter);