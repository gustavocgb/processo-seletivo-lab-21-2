const Route = require('../models/Route');

module.exports = {

    async index (req, resp) {
        const route = await Route.find(req.body);
        
        return resp.json(route);
    },

    async store (req, resp) {
       try{
            const { name, project_id, locationInitial, locationFinal } = req.body;

            const pointInitial = {
                type: 'Point',
                coordinates: [locationInitial.longitude, locationInitial.latitude]
            }

            const pointFinal = {
                type: 'Point',
                coordinates: [locationFinal.longitude, locationFinal.latitude]
            }

            let route = await Route.findOne({name});

            if(!route){
                route = await Route.create({
                    name,
                    pointInitial,
                    pointFinal,
                    project_id
                });
            }

            return resp.json(route);
        
        }catch(error){
            console.log(error);
            return error;
        }
    },

    async destroy (req, resp) {
        const { name } = req.body;
        
        let route = await Route.deleteOne({
            name
        });

        return resp.json(route);
    },
};
