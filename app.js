const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

//ROUTES
const loginRoute = require('./routes/login');
const patientRoute = require('./routes/patient');
const professionalRoute = require('./routes/professional');

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(session({
    secret: 'RANDOM_TOKEN_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set `secure: true` if you're using HTTPS
}));

// Middleware pour les informations de session, afin de les rendre disponible dans mes views
app.use((req, res, next) => {
    res.locals.token = req.session.token;
    res.locals.userId = req.session.userId;
    res.locals.pseudo = req.session.pseudo;
    next();
});

app.get('/', (req, res, next) => {
    res.render('index');
})

// app.get('/patients/add', (req, res) => {
//     res.render('add');
// })


//ROUTES USE 
app.use('/', loginRoute);
app.use('/patients', patientRoute);
app.use('/professionals', professionalRoute);

module.exports = app;