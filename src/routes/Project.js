const auth = require('../utils/middlewares/isAuth');
const ProjectController = require('../controllers/ProjectController');

module.exports = {
    project(routes){
        routes.get('/project', auth, ProjectController.index);
        routes.post('/project', auth, ProjectController.store);
        routes.delete('/project', auth, ProjectController.destroy);
        routes.post('/project/kml', auth, ProjectController.storeKml);
    }
}