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



// var Promise = require("bluebird");
// var soap = require('soap');
// let request = require('request'),
// parser = require('xml2json');


// let request_with_defaults = request.defaults({
//   'proxy': 'http://example.com:80',
//   'timeout': 5000,
//   'connection': 'keep-alive'
// });
//   var url = 'http://www.webservicex.com/globalweather.asmx?WSDL';
// // var url = 'https://cert1.springermiller.com/HTNGListener2_1/HTNGListener2_1.asmx?wsdl';
// let soap_client_options = { 'request': request_with_defaults};
// var soapHeader = {
//     "Username": "test",
//     "Password" : "test"
//   };
  
//   var args = {CountryName:'india'};
//   var soapHeader = {};
//   soap.createClient(url, function(err, client) {
//     console.log( err);
//     //   client.addSoapHeader(soapHeader);
//       client.GetCitiesByCountry(args, function(err, result, raw) {
//           // console.log(err, result);
//           var json = parser.toJson(raw);
//       // console.log("to json -> %s", json);
//       });
//   });