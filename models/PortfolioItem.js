const mongoose = require('mongoose');

const PortfolioItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true }, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema);
