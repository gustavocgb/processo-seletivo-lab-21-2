const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    uid: String,
    phone: String,
    photoURL: String
});

module.exports = mongoose.model('User', User);

