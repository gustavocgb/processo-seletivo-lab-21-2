var admin = require("firebase-admin");
var serviceAccount = require("../config/keys/chaveFirebase.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

module.exports = admin;