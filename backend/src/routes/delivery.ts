import { Router } from 'express'

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')
var router = Router();


router.get("/", (req, res) => {
    res.send('Bienvenue sur delivery')
})

module.exports = router;
