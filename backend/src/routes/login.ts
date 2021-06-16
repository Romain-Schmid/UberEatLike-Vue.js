import { Router } from 'express'

const controllerMySQL = require('../controllers/controllerSql.ts')
var router = Router();

router.put("/update", controllerMySQL.update)

router.delete("/delete", controllerMySQL.delete)


module.exports = router;
