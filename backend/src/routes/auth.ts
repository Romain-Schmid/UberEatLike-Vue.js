
module.exports = app => {

    const express = require('express');
    var router = express.Router();

    const { createJWT, checkJWT } = require('../modules/jwt');
    const crypto = require('crypto');
    const controllerMySQL = require('../controllers/controllerSql.ts')

    const db_sql = require("../models");
    const User = db_sql.model;
    

    //Create JWT
    router.post("/create", function(req, res, next){
        let token = createJWT({ email : req.body.email, role : req.body.role })
        res.cookie("token", token, {
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
        console.log(token)
        let refreshToken = createRefreshToken(req.body.email);
        console.log('refresh ' + refreshToken)
        res.json({token:token, refreshToken:refreshToken});
    });

    //VERIFY JWT
    router.post("/verify", async function(req, res, next){
        const email = req.body.email  
        const data = await User.findOne({ WHERE : {email : email }})

        if(req.body.password != data.password && req.body.email != data.email){
            res.status(400).send('Identifiants invalides')
        }
        console.log('Identifiants valides');

        var tokenGet = req.headers.authorization        
        tokenGet = tokenGet.replace(/^Bearer\s+/, "");
        let check = checkJWT(tokenGet)
        console.log(check)
        if(check == 'renew'){
            let token = createJWT({ email : data.email, role : data.role})
            let refreshToken = createRefreshToken(email);
            res.json({check:check, token: token, refreshToken: refreshToken});    
        }else{
            res.json({check:check});    
        }
    })

    app.use('/auth', router);

    //Create REFRESH Token
    async function createRefreshToken(email : string){
        const refreshToken = crypto.randomBytes(128).toString('base64');
        const expiredToken = new Date(new Date().getTime() +  7 * 24 * 60 * 60 * 1000);
        User.update(
            { refreshToken : refreshToken, expiredToken: expiredToken }, 
            { where : { email : email } }
            )
        return refreshToken
    }
};