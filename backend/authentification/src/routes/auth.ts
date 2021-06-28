import { Router } from 'express'
var router = Router();

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')

const appId = process.env.APPID;

router.get('/', (req : any, res : any) => res.send(`Opening authentification app port : ${appId}`));

//Se connecter
router.post("/login", controllerMySQL.loginAccount)


module.exports = router;