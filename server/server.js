
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from './routes';
// import logger from './core/logger/app-logger'
// import morgan from 'morgan'
// import config from './core/config/config.dev'
// import cars from './routes/cars.route'
// import connectToDb from './db/connect'

// logger.stream = {
//     write: function(message, encoding){
//         logger.info(message);
//     }
// };

// connectToDb();
// import {mongoose}  from 'mongoose';


// mongoose.connect('mongodb://localhost/Test-App');

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("database connected");
});

const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Invalid endpoint!');
});
routes(app);
app.listen(port, () => {
    console.info('server started - ', port);
});