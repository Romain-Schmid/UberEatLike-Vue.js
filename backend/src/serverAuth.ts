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
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "http://fradetaxel.fr:4000");
  res.setHeader("Access-Control-Expose-Headers", "accept");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-requested-with");

  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Access-Control-Expose-Headers: accessToken, Uid",
  //   "Access-Control-Allow-Headers: Authorization",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
});

app.use('/auth', authRouter);

const port = 4000;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

module.exports = app;
