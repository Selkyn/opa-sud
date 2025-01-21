const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const csrf = require('csurf');
const hpp = require('hpp');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const app = express();

// Configuration CORS
const corsOptions = {
    origin: process.env.URL_FRONT,
    credentials: true,
};
app.use(cors(corsOptions));

// Middlewares
app.use(cookieParser());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(xss()); // Protection contre XSS

// Helmet pour sécuriser les en-têtes HTTP
app.use(helmet());

// HPP pour éviter les attaques de pollution des paramètres HTTP
app.use(hpp());

app.use(compression()); // Compression des réponses HTTP

// Middleware CSRF
const csrfProtection = csrf({ cookie: true });

// Route pour récupérer le token CSRF
app.get("/api/csrf-token", csrfProtection, (req, res) => {
    try {
        const token = req.csrfToken(); // Fonction disponible ici
        res.json({ csrfToken: token });
    } catch (error) {
        res.status(500).json({ message: "Erreur interne lors de la génération du token CSRF." });
    }
});

// Exclusion des routes spécifiques pour CSRF
const excludedPaths = ["/api/auth/login", "/api/csrf-token"];
app.use((req, res, next) => {
    if (excludedPaths.includes(req.path)) {
        return next();
    }
    csrfProtection(req, res, next);
});

// Rate Limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: "Trop de requêtes, veuillez réessayer plus tard.",
});
app.use(limiter);

// Import des routes
const loginRoute = require('./routes/login');
const patientRoute = require('./routes/patient');
const vetCenterRoute = require('./routes/vetCenter');
const paymentTypeRoute = require('./routes/paymentType');
const paymentModeRoute = require('./routes/paymentMode');
const paymentStatusRoute = require('./routes/paymentStatus');
const paymentRoute = require('./routes/payment');
const osteoCenterRoute = require('./routes/osteoCenter');
const clientRoute = require('./routes/client');
const contactRoute = require('./routes/contact');
const appointmentRoute = require('./routes/appointment');
const workScheduleRoute = require('./routes/workschedule');
// const test = require('./routes/sex');

// Routes
app.use('/api/auth', loginRoute); // Route sans protection CSRF
app.use('/api/patients', csrfProtection, patientRoute); // Routes protégées
app.use('/api/vet-centers', csrfProtection, vetCenterRoute);
app.use('/api/osteo-centers', csrfProtection, osteoCenterRoute);
app.use('/api/paymentTypes', csrfProtection, paymentTypeRoute);
app.use('/api/paymentModes', csrfProtection, paymentModeRoute);
app.use('/api/paymentStatus', csrfProtection, paymentStatusRoute);
app.use('/api/payment', csrfProtection, paymentRoute);
app.use('/api/clients', csrfProtection, clientRoute);
app.use('/api/contacts', csrfProtection, contactRoute);
app.use('/api/appointments', csrfProtection, appointmentRoute);
app.use('/api/work-schedules', csrfProtection, workScheduleRoute);
// app.use('api/test', csrfProtection, test);

module.exports = app;


// app.use(session({
//     secret: 'RANDOM_TOKEN_SECRET',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false } // Set `secure: true` if you're using HTTPS
// }));

// Middleware pour les informations de session, afin de les rendre disponible dans mes views
// app.use((req, res, next) => {
//     res.locals.token = req.session.token;
//     res.locals.userId = req.session.userId;
//     res.locals.pseudo = req.session.pseudo;
//     next();
// });

// app.get('/', (req, res, next) => {
//     res.render('index');
// })

// app.get('/patients/add', (req, res) => {
//     res.render('add');
// })
