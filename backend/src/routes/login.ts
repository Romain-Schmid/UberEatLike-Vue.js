import { Router } from 'express'

const controllerMySQL = require('../controllers/controllerSql.ts')
var router = Router();

router.post("/create", controllerMySQL.createAccount)


module.exports = router;
