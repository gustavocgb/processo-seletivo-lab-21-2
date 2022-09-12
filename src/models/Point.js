const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const Point = new mongoose.Schema({
    description: String,
    point: {
        type: PointSchema,
        index: '2dsphere'
    },
    route_id: String
});

module.exports = mongoose.model('Point', Point);

