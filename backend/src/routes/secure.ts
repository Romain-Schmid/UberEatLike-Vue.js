import { Router } from 'express'

module.exports = app => {

    var router = Router();
    const { createJWT, checkJWT } = require('../modules/jwt');

    router.get('/', function(req,res,next) {
        var token = req.headers.authorization        
        token = token.replace(/^Bearer\s+/, "");
        if(token) {
            const verif = checkJWT(token)
            if(!verif) {
                return res.status(500).json({
                    success : false,
                    message : 'Token is not valid'
                });
            }else{
                app.set('userId', verif.user._id);
                next()
            }
        }else{
            return res.status(500).json({
                success : false,
                message : 'Token not provided'
            })
        }

        res.json({infos : 'secure ressources', _id : req.app.get('userId')});
    });

    app.use('/secure', router);

}