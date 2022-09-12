const admin = require('../../services/firebase');

module.exports = (req, res, next) => {
    //const idToken = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || null;
    const idToken = (req.headers.authorization && req.headers.authorization.split(' ')[0]) || null;
    if (idToken == null) {
        return res.status(401).json({
            code: 401,
            message: 'No token provided',
        });
    }
    admin.auth().verifyIdToken(idToken).then((decodedToken) => {
        //console.log(decodedToken);
        /*return res.status(401).json({
            code: 401,
            message: decodedToken,
        });*/
        next();
    }).catch((error) => {
        if (error.code === 'auth/argument-error') {
                return res.status(401).json({
                code: 401,
                message: 'Token invalid',
            });
        }
        return res.status(401).json({
            code: 401,
            message: 'Unauthorized',
        });
    });
}

// com token personalizado
/*async function user(req, res, next) {
    
    const idToken = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || null;

    if (idToken == null) {
        return res.status(401).json({
            code: 401,
            message: 'No token provided',
        });
    }

    admin.auth().verifyIdToken(idToken).then((decodedToken) => {
        if (decodedToken.user === true) next();
        else {
            return res.status(401).json({
                code: 401,
                message: 'Unauthorized',
            });
        }
    }).catch((error) => {
        if (error.code === 'auth/argument-error') {
            return res.status(401).json({
                code: 401,
                message: 'Invalid token',
            });
        }
        return res.status(401).json({
            code: 401,
            message: 'Unauthorized',
        });
    });
}

async function administrator(req, res, next) {
    const idToken = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || null;
    
    if (idToken == null) {
        return res.status(401).json({
            code: 401,
            message: 'No token provided',
        });
    }
    
    admin.auth().verifyIdToken(idToken).then((decodedToken) => {
        if (decodedToken.admin === true) next();
        else {
            return res.status(401).json({
                code: 401,
                message: 'Unauthorized',
            });
        }
    }).catch((error) => {
        if (error.code === 'auth/argument-error') {
            return res.status(401).json({
                code: 401,
                message: 'Invalid token',
            });
        }
        return res.status(401).json({
            code: 401,
            message: 'Unauthorized',
        });
    });
}

module.exports = { user, administrator };*/