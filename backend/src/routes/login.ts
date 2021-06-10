import { Router } from 'express'
import { useAsPath } from 'tslint/lib/configuration';


const controllerMySQL = require('../controllers/controllerSql.ts')
var router = Router();
const { createJWT, checkJWT, createRefreshToken } = require('../modules/jwt');

router.post("/create", controllerMySQL.createAccount)

router.post("/login", controllerMySQL.loginAccount)

router.post('/token/login', (req, res) => {
    const user = {
        email : req.body.email,
        role : req.body.role
    }
    const accessToken = createJWT(user);
    const refreshToken = createRefreshToken(user);
    res.json({accessToken : accessToken, refreshToken : refreshToken})
})



module.exports = router;
