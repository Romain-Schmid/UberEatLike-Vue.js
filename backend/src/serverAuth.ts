import mongoose from 'mongoose';
import Sensor from './models/sensor_models';
require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const log = require('./modules/logger')
const { checkJWT } = require('./modules/jwt');

//Import routes 
var authRouter = require('./routes/auth')



//Create App with options
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://fradetaxel.fr:4567');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/auth', authRouter);

const port = 4000;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

module.exports = app;
