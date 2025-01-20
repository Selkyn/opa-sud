const express = require('express');
const cors = require('cors');
// const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('./config/passport')(passport);
require('dotenv').config();
const app = express();

//ROUTES
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
const test = require('./routes/sex')

// app.set('view engine', 'ejs');
const corsOptions = {
    origin: 'http://localhost:3000', // Autorise uniquement le frontend
    credentials: true, // Permet l'envoi des cookies et des headers d'authentification
};

// app.use(cors());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(passport.initialize());

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


//ROUTES USE 
app.use('/auth', loginRoute);
app.use('/patients', patientRoute);
app.use('/vet-centers', vetCenterRoute);
app.use('/osteo-centers', osteoCenterRoute);
app.use('/paymentTypes', paymentTypeRoute);
app.use('/paymentModes', paymentModeRoute);
app.use('/paymentStatus', paymentStatusRoute);
app.use('/payment', paymentRoute);
app.use('/clients', clientRoute);
app.use('/contacts', contactRoute);
app.use('/appointments', appointmentRoute);
app.use('/work-schedules', workScheduleRoute);
app.use('/test', test)

module.exports = app;