const express = require('express');
const multer = require('multer');
const PortfolioItem = require('../models/PortfolioItem');
const ensureAuthenticated = require('../middleware/auth');
const router = express.Router();


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, 
});


router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const portfolioItems = await PortfolioItem.find();
        res.render('portfolio', { portfolioItems });
    } catch (error) {
        console.error('Error fetching portfolio items:', error);
        res.status(500).send('Error fetching portfolio items');
    }
});

router.post('/create', ensureAuthenticated, upload.array('images', 3), async (req, res) => {
    try {
        const { title, description } = req.body;

        
        const images = req.files.map(file => `/uploads/${file.filename}`);
        const portfolioItem = new PortfolioItem({ title, description, images });

        await portfolioItem.save();

        res.redirect('/portfolio');
    } catch (error) {
        console.error('Error creating portfolio item:', error);
        res.status(500).send('Error creating portfolio item');
    }
});

router.post('/update/:id', ensureAuthenticated, upload.array('images', 3), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : undefined;

        await PortfolioItem.findByIdAndUpdate(id, {
            title,
            description,
            ...(images && { images }),
            updatedAt: new Date(),
        });

        res.redirect('/portfolio');
    } catch (error) {
        console.error('Error updating portfolio item:', error);
        res.status(500).send('Error updating portfolio item');
    }
});

router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;

        await PortfolioItem.findByIdAndDelete(id);
        res.redirect('/portfolio');
    } catch (error) {
        console.error('Error deleting portfolio item:', error);
        res.status(500).send('Error deleting portfolio item');
    }
});

module.exports = router;
