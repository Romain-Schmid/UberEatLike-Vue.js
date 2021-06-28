export {};

var jwt = require('jsonwebtoken');

const createJWT = (user : any) => {
    var token = jwt.sign({
        user : user,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '1h' });
    
    return token
}

const createRefreshJWT = (user: any) => {
    var refreshToken = jwt.sign({
        user : user,
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'});
    return refreshToken
}


const checkJWT = (token: string) => {
    let check = false;
    try {
        check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }catch(err){
        if(err.name == 'TokenExpiredError'){
            return err.name;
        }else {
            check = false;
        }
    }
    return check;
}


const checkRefreshToken = (token : string) => {
    let check = false;
    try {
        check = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }catch(err){
        if(err.name == 'TokenExpiredError'){
            return err.name;
        }else {
            check = false;
        }
    }
    return check;
}


module.exports = {createJWT: createJWT, checkJWT: checkJWT, checkRefreshToken:checkRefreshToken, createRefreshJWT:createRefreshJWT}