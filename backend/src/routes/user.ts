import { Router } from 'express'


const controllerMySQL = require('../controllers/controllerSql.ts')
var router = Router();

router.post("/create", controllerMySQL.create)

router.get("/getAll", controllerMySQL.findAll)

router.get("/get/:id", controllerMySQL.findAll)

router.get("/getmyid", controllerMySQL.findMe)

router.put("/edit/:id", controllerMySQL.update)

router.delete("/delete/:id", controllerMySQL.delete)

router.delete("/delete", controllerMySQL.deleteAll)

module.exports = router;
