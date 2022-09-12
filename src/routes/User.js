const UserController = require('../controllers/UserController');
const auth = require('../utils/middlewares/isAuth');

module.exports = {
    user(routes){
        routes.get('/user', auth, UserController.index);
        routes.post('/user', auth, UserController.store);
        routes.put('/user', auth, UserController.update);
        routes.delete('/user', auth, UserController.destroy);
    }
}