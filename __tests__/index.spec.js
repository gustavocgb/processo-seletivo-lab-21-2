require('dotenv/config');
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const firebase = require('firebase');
const connectDB = require('../src/services/connectDB');
const {app} = require('../index')


/*const app = express();
const routes = require('../src/routes/routes');
app.use(cors());
app.use(express.json());
app.use(routes);*/

// firebase config
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// initialize firebase and mongoDb
firebase.initializeApp(firebaseConfig);
connectDB.connect();

const token = {
    cod: null
}

describe('Test home', () => {
    it('should get default route', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    })
})

describe('Test heroku', () => {
    it('route', async () => {
        const res = await request('https://guia-smart.herokuapp.com').get('/');
        expect(res.statusCode).toEqual(200);
    })
})

describe('Test user', () => {
    beforeAll(async () => {
        const authUser = await firebase.auth().signInWithEmailAndPassword('gustavocgb@yahoo.com.br', '123456');
        const currentUser = await firebase.auth().currentUser;
        token.cod = await currentUser.getIdToken();
    });    

    it('list users', async () => {        
        const res = await request(app).get('/user').send({}).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })

    it('cad user', async () => {

        const authUser = await firebase.auth().createUserWithEmailAndPassword('usertest@gmail.com', '123456');                
        //console.log(authUser.user.uid);

        const res = await request(app).post('/user').send({
            name: authUser.user.displayName,
            email: authUser.user.email,
            password: null,
            uid: authUser.user.uid,
            phone: authUser.user.phoneNumber,
            photoURL: authUser.user.photoURL
        }).set({authorization:token.cod});
        expect(authUser.user).toHaveProperty('uid');
        expect(res.statusCode).toEqual(200);
    })

    it('delete user', async () => {
        const user = firebase.auth().currentUser;
        await user.delete();
        const res = await request(app).delete('/user').send({email: 'usertest@gmail.com'}).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })
    
})

describe('Test authentication', () => {
    it('login and validate token', async () => {
        const authUser = await firebase.auth().signInWithEmailAndPassword('gustavocgb@yahoo.com.br', '123456');                
        // console.log(authUser.user);

        const currentUser = await firebase.auth().currentUser;
        const token = await currentUser.getIdToken();

        const req = await request(app).get('/login').set({authorization:token});
        
        //expect(req.redirect).toEqual(true);
        expect(req.send);

        await firebase.auth().signOut();

    })
})

describe('Test project', () => {
    beforeAll(async () => {
        const authUser = await firebase.auth().signInWithEmailAndPassword('gustavocgb@yahoo.com.br', '123456');
        const currentUser = await firebase.auth().currentUser;
        token.cod = await currentUser.getIdToken();
    });

    it('list projects', async () => {
        const res = await request(app).get('/project').send({}).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })

    it('cad project', async () => {
        const res = await request(app).post('/project').send({
            name: 'project test 2',
        }).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })

    it('import kml', async () => {

        const geojson = {            
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-43.5030351, -20.398445]
            },
            "properties": {
                "name": "Dinagat Islands"
            }              
        }

        const resProject = await request(app).get('/project').send({name:'project test'}).set({authorization:token.cod});
        const project_name = resProject.body[0].name;

        const res = await request(app).post('/project/kml').send({
            project_name,
            geojson,            
        }).set({authorization:token.cod});

        //console.log(res.body);
        expect(res.statusCode).toEqual(200);

    })

    it('delete project', async () => {
        const res = await request(app).delete('/project').send({name: 'project test 2'}).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })
    
})

describe('Test Route', () => {
    beforeAll(async () => {
        const authUser = await firebase.auth().signInWithEmailAndPassword('gustavocgb@yahoo.com.br', '123456');
        const currentUser = await firebase.auth().currentUser;
        token.cod = await currentUser.getIdToken();
    });

    it('list route', async () => {
        const res = await request(app).get('/project/route').send({}).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })

    it('cad route', async () => {
        const locationInitial = {
            longitude: -43.5030351,
            latitude: -20.398445
        }

        const locationFinal = {
            longitude: -43.5025632,
            latitude: -20.3970691
        }

        const resProject = await request(app).get('/project').send({name:'project test'}).set({authorization:token.cod});
        const project_id = resProject.body[0]._id;

        const res = await request(app).post('/project/route').send({
            name: 'route test',
            project_id,
            locationInitial,
            locationFinal,            
        }).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })

    it('delete route', async () => {
        const res = await request(app).delete('/project/route').send({name: 'project test'}).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })
    
})

describe('Test Point', () => {
    beforeAll(async () => {
        const authUser = await firebase.auth().signInWithEmailAndPassword('gustavocgb@yahoo.com.br', '123456');
        const currentUser = await firebase.auth().currentUser;
        token.cod = await currentUser.getIdToken();
    });

    it('list point', async () => {
        const res = await request(app).get('/project/route/point').send({}).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })

    it('cad point', async () => {
        const location = {
            longitude: -43.501573,
            latitude: -20.396522
        }

        const resPoint = await request(app).get('/project/route').send({name:'route test'}).set({authorization:token.cod});
        const route_id = resPoint.body[0]._id;

        const res = await request(app).post('/project/route/point').send({
            description: 'point test',
            location,
            route_id,      
        }).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })

    it('edit point', async () => {        
        const res = await request(app).put('/project/route/point').send({
            description: 'point test 3',
            point_id: '60fb1afbe0deb226bf2d3bea'    
        }).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })

    it('delete point', async () => {
        const res = await request(app).delete('/project/route/point').send({description: 'point test'}).set({authorization:token.cod});
        expect(res.statusCode).toEqual(200);
    })
    
})