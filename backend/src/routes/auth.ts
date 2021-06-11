

const express = require('express');
var router = express.Router();

const { createJWT, checkJWT, createRefreshJWT } = require('../modules/jwt');
const randomBytes = require('randombytes');
const db_sql = require("../models");
const User = db_sql.model;
const controllerMySQL = require('../controllers/controllerSql.ts')
var jwt = require('jsonwebtoken');


//Se connecter
router.post("/login", controllerMySQL.loginAccount)

//Create an another Access Token by refreshToken
router.post("/token", async function(req, res, next){
    const {email, role} = req.body  

    const data = await User.findOne({ where : {email : email, role:role }})   
    if(data == null){
        return res.status(400).send('Cannot find user')   
    }
    const refreshToken = data.refreshToken;
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshToken.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {   
        console.log(user) 
        const accessToken = createJWT({ email : user.email, role : user.role })
        res.json({ accessToken: accessToken })
    })
;})

//Logout to delete RefreshToken
router.delete('/logout', function (req, res){
    console.log(req.body)
    const email = req.body.email;
    User.update({ refreshToken : null}, {where : {email : email}});
    res.status(204).send('Logout');
})

//VERIFY JWT
router.post("/verify", async function(req, res, next){
    const email = req.body.email  
    const data = await User.findOne({ where : {email : email }})

    if(req.body.password != data.password || req.body.email != data.email || req.body.role != data.role){
        res.status(400).send('Identifiants invalides')
    }
    console.log('Identifiants valides');

    var tokenGet = req.headers.authorization        
    tokenGet = tokenGet.replace(/^Bearer\s+/, "");
    let check = checkJWT(tokenGet)
    console.log(check)
    if(check == 'renew'){
        let token = createJWT({ email : data.email, role : data.role})
        let refreshToken = await createRefreshToken(data.email, data.role);
        res.json({check:check, token: token, refreshToken: refreshToken});    
    }else{
        res.json({check:check});    
    }
})

//Create REFRESH Token
async function createRefreshToken(email : string, role : string){
    const refreshToken = createRefreshJWT({ email : email, role : role })
    const expiredToken = new Date(new Date().getTime() +  7 * 24 * 60 * 60 * 1000);
    User.update(
        { refreshToken : refreshToken, expiredToken: expiredToken }, 
        { where : { email : email } }
        )
    return refreshToken
}

module.exports = router;