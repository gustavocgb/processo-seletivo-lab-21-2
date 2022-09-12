const User = require('../models/User');

// index, show, store, update, destroy

module.exports = {

    async index (req, resp) {
        const users = await User.find(req.body);
        
        return resp.json(users);
    },

    async store (req, resp) {
        try{
            const { name, email, password, uid, phone, photoURL } = req.body;

            let user = await User.findOne({email});

            if(!user){
                user = await User.create({
                    name, 
                    email, 
                    password, 
                    uid,
                    phone,
                    photoURL
                });
            }

            return resp.json(user);
        
        }catch(error){
            console.log(error);
            return error;
        }
    },

    async destroy (req, resp) {
        const { email } = req.body;
        
        let user = await User.deleteOne({
            email
        });

        return resp.json(user);
    },

    async update(){
        
    },

};
