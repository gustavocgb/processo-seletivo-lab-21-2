const mongoose = require('mongoose');

const Project = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Project', Project);

