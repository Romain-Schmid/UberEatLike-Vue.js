import mongoose from 'mongoose';
require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
var cors = require('cors')

var corsOptions = {
  origin: ['http://78.123.229.253:443', 'http://localhost:8080', 'http://localhost:8081', 'https://cesi.elective.dev.fradetaxel.fr'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  credentials : true
}

//Import routes 
var authRouter = require('./routes/auth')



//Create App with options
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions))
// app.use((req, res, next) => {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://78.123.229.253:8083');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use('/auth/auth', authRouter);

const port = 4000;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

module.exports = app;
