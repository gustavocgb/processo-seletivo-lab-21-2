const auth = require('../utils/middlewares/isAuth');
const PointController = require('../controllers/PointController');

module.exports = {
    point(routes){
        routes.get('/project/route/point', auth, PointController.index);
        routes.post('/project/route/point', auth, PointController.store);
        routes.put('/project/route/point', auth, PointController.update);
        routes.delete('/project/route/point', auth, PointController.destroy);
    }
}