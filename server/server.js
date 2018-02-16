import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from './routes';
import expressValidator from 'express-validator';
import session from 'express-session';
import mongoose from 'mongoose';
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/Nodelogin', {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("database connected");
});

const port = 3000;
export const app = express();
app.use(session({
  secret: 'TestTastyNodeNody',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connections[0],
    ttl: 2 * 24 * 60 * 60
  })
}));



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());


routes(app);
app.listen(port, () => {
    console.info('server started - ', port);
});
