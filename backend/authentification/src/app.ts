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

//Middleware
var secure = async function (req,res,next) {
    //Get Token dans le header
    try {
      var { accessToken, refreshToken } = req.body.cookies;
    }
    catch{
      return res.status(401).json({
        message : "Acces refusé, token incorrect ou inexistant"
      })  
    }
    
    console.log(accessToken);
    console.log(refreshToken);
  
    if(!refreshToken && !accessToken){
      console.log("incorrect")
      return res.status(401).json({
        message : "Acces refusé, token incorrect ou inexistant"
      })  
    }
  
    try {
  
      const verif = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      let decoded : any = jwt_decode(accessToken)
      const {email, role} = decoded.user;
      req.email = email;
      req.role = role;
      return res.sendStatus(200)    
    } catch (err) {
      
      //Si le token a expiré
      if(err && refreshToken) {
        let decoded : any = jwt_decode(refreshToken)
        const {email, role} = decoded.user;
  
        //Recup RefreshToken pour voir s'il est toujours valide
        const data = await User.findOne({ where : {email : email, role:role }})   
        const refreshTok = data.refreshToken;
        //Return si Refresh Token Inexistant
        if(refreshTok == null) return res.sendStatus(401)
        if(!refreshTok.includes(refreshTok)) return res.sendStatus(403)
        //Check Refresh Token
        const verifRefresh = checkRefreshToken(refreshTok)
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
          return res.sendStatus(200)    
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
  
app.post("/auth/middleware", secure)
  

export default app;
