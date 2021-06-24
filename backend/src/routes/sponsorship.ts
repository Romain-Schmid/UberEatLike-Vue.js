import { Router } from 'express'

const controllerSponsor = require('../controllers/controllerSponsor')
var router = Router();


router.get("/", (req, res) => {
    res.send('Bienvenue sur Sponsorship')
})

router.post("/create", controllerSponsor.create)

router.get("/getAll", controllerSponsor.getAll)

router.get("/get/:id_sponsor", controllerSponsor.findOne)

router.delete("/delete/:id_sponsor", controllerSponsor.delete)


module.exports = router;
