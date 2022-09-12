const express = require('express');
const connectDB = require('./src/services/connectDB');
const cors = require('cors');
let port = process.env.PORT || 3000;

const routes = require('./src/routes/routes');
const app = express();
connectDB.connect();

app.use(cors()) // libera acesso a todo tipo de aplicacao
app.use(express.json());
app.use(routes);
app.listen(port);
//app.listen(3333);

module.exports = {
  app
}



