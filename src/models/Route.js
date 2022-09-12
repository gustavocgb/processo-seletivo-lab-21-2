const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const Route = new mongoose.Schema({
    name: String,
    pointInitial: {
        type: PointSchema,
        index: '2dsphere'
    },
    pointFinal: {
        type: PointSchema,
        index: '2dsphere'
    },
    project_id: String
});

module.exports = mongoose.model('Route', Route);

