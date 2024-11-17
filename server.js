require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const methodOverride = require('method-override');
const app = express();
const portfolioRoutes = require('./routes/portfolio');
const apiRoutes = require('./routes/api');
const ensureAuthenticated = require('./middleware/auth');



dotenv.config();


// Middleware
app.use((req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next();
});
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session && req.session.user; 
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));





mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.use('/auth', authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/portfolio', portfolioRoutes);
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.render('home'); 
});
app.get('/inflation', ensureAuthenticated, (req, res) => {
    res.render('inflation');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
