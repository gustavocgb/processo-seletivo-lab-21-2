const mongoose = require('mongoose');
require('dotenv/config');

module.exports = {

    async connect () {
        await mongoose.connect(process.env.CONNECT_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },

};

