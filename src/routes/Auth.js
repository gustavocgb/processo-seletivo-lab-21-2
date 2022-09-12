const AuthController = require('../controllers/AuthController');
const auth = require('../utils/middlewares/isAuth');

module.exports = {
    auth(routes){
        routes.get('/login', auth, AuthController.auth);
        //routes.get('/authUser', auth.user, AuthController.authUser);
        //routes.get('/authAdmin', auth.administrator, AuthController.authAdmin);
    }
}