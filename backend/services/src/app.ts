import mongoose from 'mongoose';
import jwt_decode from "jwt-decode";

require("dotenv").config();
const express = require('express');
const socketio = require('socket.io')
const path = require('path');
const cookieParser = require('cookie-parser')
const request = require('request');

const logger = require('morgan');
const log = require('./modules/logger')
const { createJWT , checkRefreshToken } = require('./modules/jwt');
var jwt = require('jsonwebtoken');
const db_sql = require("./models");
const User = db_sql.model.User;
var cors = require('cors')

var corsOptions = {
  origin: ['http://78.123.229.253:443', 'http://localhost:8080', 'http://localhost:8081', 'https://cesi.elective.dev.fradetaxel.fr'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials : true
}

const controllerMySQL = require('./controllers/controllerLoginAuth.ts')

//Import routes 
var accountRouter = require('./routes/account');
var orderRouter = require('./routes/order');
var restaurantRouter = require('./routes/restaurant');
var sponsorRouter = require('./routes/sponsorship');

// Connection MongoDB
mongoose.connect('mongodb://fradetaxel.fr:2717/test', {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true, useFindAndModify: false
});
// const db_mongo = mongoose.connection;
// db_mongo.on('error', console.error.bind(console, 'connection error:'));
// db_mongo.once('open', function() {
//    console.log('MongoDB connected...')
// });

// Connection MySQL
// const db = require('./models');
// db.sequelize.authenticate()
//   .then(()=>console.log('MySQL connected...'))
//   .catch(err => console.log('Error : ' + err))
// db.sequelize.sync().then(() => {
//   console.log("Drop and re-sync db.");
// });


//Create App with options
const app = express();
const appId = process.env.APPID;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions))
app.disable('etag');

app.get('/api/', (req, res) => res.send(`Opening service app port : ${appId}`))

app.post("/api/login/create",  controllerMySQL.createAccount)

//Middleware
var secure = async function (req,res,next) {

  //Get Token dans le header
  var tokenCookie = req.cookies.accessToken;
  var refreshTokenCookie = req.cookies.refreshToken;
  console.log(req.cookies)
  console.log(tokenCookie);
  console.log(refreshTokenCookie);

  if(!refreshTokenCookie && !tokenCookie){
    console.log("incorrect")
    return res.status(401).json({
      message : "Acces refusé, token incorrect ou inexistant"
    })  
  }

  try {

    const verif = jwt.verify(tokenCookie, process.env.ACCESS_TOKEN_SECRET);
    let decoded : any = jwt_decode(tokenCookie)
    const {email, role} = decoded.user;
    req.email = email;
    req.role = role;
    next(); //Si pas d'erreur, next

  } catch (err) {
    
    //Si le token a expiré
    if(err && refreshTokenCookie) {
      let decoded : any = jwt_decode(refreshTokenCookie)
      const {email, role} = decoded.user;

      //Recup RefreshToken pour voir s'il est toujours valide
      const data = await User.findOne({ where : {email : email, role:role }})   
      const refreshToken = data.refreshToken;
      //Return si Refresh Token Inexistant
      if(refreshToken == null) return res.sendStatus(401)
      if(!refreshToken.includes(refreshToken)) return res.sendStatus(403)
      //Check Refresh Token
      const verifRefresh = checkRefreshToken(refreshToken)
      //Si Refresh Token périmé ou autre erreur
      if(verifRefresh == 'TokenExpiredError' || !verifRefresh){
        console.log("incorrect")
        return res.status(401).json({
          message : "Veuillez vous reconnecter, votre session a expiré"
        })  
      }
      //Si Refresh Token valide
      else {
        const accessToken = createJWT({ email : email, role : role })
        req.email = email;
        req.role = role;
        res.statusCode = 401
        res.cookie("accessToken", accessToken, {
          expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          httpOnly: false,
          maxAge:120000,
          secure: true,
          sameSite: "None",
        });        
        next();
      }
      
    }
    //Si token incorrect
    else{
      console.log("incorrect")
      return res.status(401).json({
        message : "Acces refusé, token incorrect ou inexistant"
      })  
    }
  }
}

app.use(secure)

app.use('/api/account', accountRouter);
app.use('/api/order', orderRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/sponsor', sponsorRouter);



export default app;
