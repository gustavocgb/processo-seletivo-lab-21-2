const Project = require('../models/Project');
const tokml = require('geojson-to-kml');

module.exports = {

    async index (req, resp) {
        const project = await Project.find(req.body);

        return resp.json(project);
    },

    async store (req, resp) {
        try{
            const { name } = req.body;

            let project = await Project.findOne({name});

            if(!project){
                project = await Project.create({
                    name,
                });
            }

            return resp.json(project);
        
        }catch(error){
            console.log(error);
            return error;
        }
    },

    async destroy (req, resp) {
        const { name } = req.body;
        
        let project = await Project.deleteOne({
            name
        });

        return resp.json(project);
    },

    async storeKml(req, resp){
        const { project_name, geojson } = req.body;

        const kml = tokml(geojson, {
            documentName: project_name
        });

        return resp.json(kml);
    }
};
