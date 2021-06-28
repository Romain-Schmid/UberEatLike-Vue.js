import { Router } from 'express'

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')
var router = Router();


router.get("/", (req : any, res : any) => {
    res.send('Bienvenue sur stats')
})

module.exports = router;
