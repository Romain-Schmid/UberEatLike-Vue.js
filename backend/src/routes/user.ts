import { Router } from 'express'


const controllerMySQL = require('../controllers/controllerSql.ts')
var router = Router();

router.post("/create", controllerMySQL.create)

router.get("/getAll", controllerMySQL.findAll)

router.get("/get/:id", controllerMySQL.findOne)

router.get("/getmyid", controllerMySQL.findMe)

router.put("/edit/", controllerMySQL.update)

router.put("/edit/:id", controllerMySQL.updateParam)


router.delete("/delete/:id", controllerMySQL.delete)

router.delete("/delete", controllerMySQL.deleteAll)

module.exports = router;
