const RouteController = require('../controllers/RouteController');
const auth = require('../utils/middlewares/isAuth');

module.exports = {
    route(routes){
        routes.get('/project/route', auth, RouteController.index);
        routes.post('/project/route', auth, RouteController.store);
        routes.delete('/project/route', auth, RouteController.destroy);
    }
}