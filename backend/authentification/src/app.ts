export {}
import jwt_decode from "jwt-decode";
const express = require('express');
const app = express();

//Import middleware
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const db_sql = require("./models");
const User = db_sql.model.User;
const log = require('./modules/logger')
const { createJWT , checkRefreshToken } = require('./modules/jwt');
var cors = require('cors')
var jwt = require('jsonwebtoken');

//Create middleware with options
var corsOptions = {
  origin: ['http://78.123.229.253:443', 'http://localhost:8080', 'http://localhost:8081', 'https://cesi.elective.dev.fradetaxel.fr'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  credentials : true
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions))

//Import routes 
var authRouter = require('./routes/auth')
app.use('/auth', authRouter);

export default app;
