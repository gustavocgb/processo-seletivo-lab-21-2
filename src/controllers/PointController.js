const Point = require('../models/Point');

module.exports = {

    async index (req, resp) {
        const point = await Point.find(req.body);
        
        return resp.json(point);
    },

    async store (req, resp) {
       try{
            const { description, location, route_id } = req.body;

            const point = {
                type: 'Point',
                coordinates: [location.longitude, location.latitude]
            }

            const newPoint = await Point.create({
                description,
                point,
                route_id,
            });

            return resp.json(newPoint);
        
        }catch(error){
            console.log(error);
            return error;
        }
    },

    async update (req, resp) {
        try{
             const { description, point_id } = req.body;
             
             const editPoint = await Point.findByIdAndUpdate(
                point_id,
                 {
                    description: description
                 }
             );
 
             return resp.json(editPoint);
         
         }catch(error){
             console.log(error);
             return error;
         }
     },

    async destroy (req, resp) {
        const { description } = req.body;
        
        let point = await Point.deleteOne({
            description
        });

        return resp.json(point);
    },
};
