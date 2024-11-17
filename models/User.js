const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
    twoFAEnabled: { type: Boolean, default: false },
});


module.exports = mongoose.model('User', UserSchema);
