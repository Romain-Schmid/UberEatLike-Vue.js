import { Router } from 'express'

module.exports = app => {

    const controllerMySQL = require('../controllers/controllerSql.ts')
    var router = Router();

    router.post("/create", controllerMySQL.create)

    router.get("/getAll", controllerMySQL.findAll)

    router.get("/get/:id", controllerMySQL.findAll)

    router.put("/edit/:id", controllerMySQL.update)

    router.delete("/delete/:id", controllerMySQL.delete)

    router.delete("/delete", controllerMySQL.deleteAll)

    app.use('/api', router);

};