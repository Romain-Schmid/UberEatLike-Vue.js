import { Router } from 'express'

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')
var router = Router();


router.get("/", (req, res) => {
    res.send('Bienvenue sur Sponsorship')
})

module.exports = router;
