export {};

var jwt = require('jsonwebtoken');

const createJWT = (user) => {
    var token = jwt.sign({
        user : user,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '15s' });
    
    return token
}

const createRefreshJWT = (user) => {
    var refreshToken = jwt.sign({
        user : user,
    }, process.env.REFRESH_TOKEN_SECRET);
    return refreshToken
}


const checkJWT = (token) => {
    let check = false;

    try {
        check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        }catch(err){
        if(err.name == 'TokenExpiredError'){
            return 'renew';
        }else {
            check = false;
        }
    }
    return check;
}


module.exports = {createJWT: createJWT, checkJWT: checkJWT, createRefreshJWT:createRefreshJWT}