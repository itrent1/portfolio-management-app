const express = require('express');
const axios = require('axios');
const ensureAuthenticated = require('../middleware/auth');
const router = express.Router();


const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/inflation',ensureAuthenticated, async (req, res) => {
    try {
        const { country = 'US' } = req.query;

        const response = await axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/FP.CPI.TOTL.ZG`, {
            params: {
                format: 'json',
                per_page: 10, 
            },
        });

        console.log('World Bank API Response:', response.data); 
        if (!response.data || !response.data[1]) {
            console.warn(`No inflation data found for country: ${country}`);
            return res.status(404).json({ error: `No data available for the selected country: ${country}` });
        }

        const data = response.data[1]
            .filter(item => item.value !== null)
            .map(item => ({
                year: item.date,
                inflationRate: item.value,
            }));

        res.json(data);
    } catch (error) {
        console.error('Error fetching inflation data:', error.message);
        res.status(500).json({ error: 'Error fetching inflation data' });
    }
});




router.get('/news', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                category: 'business',
                apiKey: NEWS_API_KEY,
            },
        });
        res.json(response.data.articles);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).send('Error fetching news data');
    }
});

module.exports = router;
