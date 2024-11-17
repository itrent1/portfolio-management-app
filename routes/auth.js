require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');


dotenv.config();



router.get('/register', (req, res) => {
    res.render('register', { title: 'Регистрация' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});


router.post('/register', async (req, res) => {
    try {
        const { username, password, firstName, lastName, age, gender } = req.body;

        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            age,
            gender,
        });

        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error registering user');
    }
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log(`Attempting login for username: ${username}`); 

       
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(401).send('Invalid email or password');
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).send('Invalid email or password');
        }

        
        console.log('Login successful');
        req.session.user = user;
        res.redirect('/portfolio');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
