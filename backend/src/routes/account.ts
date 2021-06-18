import { Router } from 'express'

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')
var router = Router();

router.put("/update", controllerMySQL.update)

router.delete("/delete", controllerMySQL.delete)

router.get("/", (req, res) => {
    res.send('Bienvenue sur Account')
})

module.exports = router;
