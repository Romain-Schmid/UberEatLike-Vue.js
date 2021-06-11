import mongoose from 'mongoose';
import Sensor from './models/sensor_models';
require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const log = require('./modules/logger')
const cors = require("cors");
const { checkJWT } = require('./modules/jwt');

//Import routes 
var authRouter = require('./routes/auth')

var corsOptions = {
  origin: "http://localhost:3001",
};


//Create App with options
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));


app.use('/auth', authRouter);

const port = 4000;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

module.exports = app;
