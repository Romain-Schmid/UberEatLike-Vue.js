import { Router } from 'express'
var router = Router();

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')

const appId = process.env.APPID;

router.get('/', (req, res) => res.send(`Opening authen app port : ${appId}`));

//Se connecter
router.post("/login", controllerMySQL.loginAccount)


module.exports = router;